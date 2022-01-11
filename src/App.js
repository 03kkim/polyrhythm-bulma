import './App.sass';
import * as Tone from 'tone';
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Button } from "./components/FlashingButton";
import { RangeSlider } from "./components/RangeSlider";


function App() {
  const [buttonColor, setButtonColor] = useState("");
  const [isPlaying, setIsPlaying] = useState(false); 
  const [tempo, setTempo] = useState(60);

  const synthA = new Tone.MembraneSynth().toDestination();
  const synthB = new Tone.MembraneSynth().toDestination();
  const sliderValueChanged = useCallback(val => {
    console.log("NEW VALUE", val);
    setTempo(val);
  });

  const [rhythmA, setRhythmA] = useState("1n");
  const [rhythmB, setrhythmB] = useState("1n");


  const clickLoopA = useRef(null);
  const clickLoopB = useRef(null);

  // keeps track of current beat 
  const currentBeat = useRef(0);

  const subdivisionLengthA = "4n";
  const attackReleaseLengthA = parseInt(subdivisionLengthA.replace('n', '') * 2).toString() + "n";
  /**
   * CREDIT TO RENZO (renzol2) FOR FIGURING THIS OUT
   * Changes button color based on time:
   * - if round(time) is odd, make it normal
   * - if round(time) is even, make it a warning
   * @param {Number} time current time of loop
   */
  function changeButtonColor() {
    if (currentBeat.current % 2 === 0) {
      setButtonColor("warning");
    } else {
      setButtonColor("");
    }
    console.log(buttonColor);
    
  }
  const updateTempo = () => {
    Tone.Transport.bpm.rampTo(tempo, 0.1);
  };
  useEffect(() => {
    updateTempo()
  }, [tempo]);

  const startTone = () => {
    if (isPlaying) {
      setIsPlaying(false);
      clickLoopA.current.dispose();
      clickLoopB.current.dispose();
      Tone.Transport.cancel();
      console.log("stop audio");
    } else {
      setIsPlaying(true);
      // The loop is initialized in clickLoop, which is a useRef() which means that it persists through renders
      clickLoopA.current = new Tone.Loop((time) => {
        synthA.triggerAttackRelease("C1", attackReleaseLengthA, time);
        console.log(time);
        currentBeat.current = currentBeat.current + 1;

        
      }, subdivisionLengthA);

      clickLoopB.current = new Tone.Loop((time) => {
        synthA.triggerAttackRelease("C2", attackReleaseLengthA, time);
        console.log(time);
        currentBeat.current = currentBeat.current + 1;
        
      }, "5n");

      clickLoopA.current.start();
      clickLoopB.current.start();
      Tone.Transport.start();
      // sets Transport's BPM
      Tone.Transport.bpm.value = tempo;
      console.log("audio is ready");
    }
  }

  const sliderProps = useMemo(
    () => ({
      min: 0,
      max: 100,
      value: tempo,
      step: 2,
      label: "Set your tempo with this slider:",
      onChange: e => sliderValueChanged(e)
    }),
    [tempo]
  );

  return (
    <div className="Site">
      <main class="Site-content">
      <div className="container is-fluid pt-5 has-text-centered mb-6">
        <h2 className="title is-2">Polyrthm</h2>
        <p className="subtitle is-4">The web-based polyrhythm trainer</p>
        <div className="box mb-6">
          <Button color={buttonColor} onClick={startTone} isPlaying={isPlaying} spacing="mb-3" buttonContent="Click me to start!" />
          <RangeSlider {...sliderProps} min={33} max={300} step="0.5" />
        </div>
        <div className="box">
          <div className="columns">
            <div className="column">
            <input className="input" type="text" placeholder="Note 1" />
            </div>
            <div className="column">
            <input className="input" type="text" placeholder="Note 2" />
            </div>
          </div>
          <Button buttonContent="Change polyrhythm" />
        </div>
      </div>
      </main>
      <footer className="footer">
        <div className="content has-text-centered">
          <strong>Polyrthm</strong> by <a href="https://github.com/03kkim">Kyu Hong Kim</a>.
          The <a href="https://github.com/03kkim/polyrhythm-bulma/tree/master">source code</a> is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
          </div>
      </footer>
    </div>
  );
}

export default App;
