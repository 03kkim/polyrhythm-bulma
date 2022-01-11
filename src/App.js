import './App.sass';
import * as Tone from 'tone';
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Button } from "./components/FlashingButton";
import { RangeSlider } from "./components/RangeSlider";


function App() {
  const [buttonColor, setButtonColor] = useState("");
  const [isPlaying, setIsPlaying] = useState(false); 
  const [tempo, setTempo] = useState(120);

  const synthA = new Tone.MembraneSynth().toDestination();
  const synthB = new Tone.MembraneSynth().toDestination();
  const sliderValueChanged = useCallback(val => {
    console.log("NEW VALUE", val);
    setTempo(val);
  });

  const [rhythmA, setRhythmA] = useState("4n");
  const attackReleaseLengthA = parseInt(rhythmA.replace('n', '') * 2).toString() + "n";

  const [rhythmB, setRhythmB] = useState("4n");
  const attackReleaseLengthB = parseInt(rhythmB.replace('n', '') * 2).toString() + "n";

  const clickLoopA = useRef(null);
  const clickLoopB = useRef(null);

  // keeps track of current beat 
  const currentBeat = useRef(0);


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

  const createLoop = (note, attackReleaseLength, rhythm) => {
    return new Tone.Loop((time) => {
      synthA.triggerAttackRelease(note, attackReleaseLength, time);
      console.log(time);
      currentBeat.current = currentBeat.current + 1;
    }, rhythm);
  }
  const stopTone = () => {
    setIsPlaying(false);
    clickLoopA.current.dispose();
    clickLoopB.current.dispose();
    Tone.Transport.cancel();
    console.log("stop audio");
  }
  const startTone = () => {
    setIsPlaying(true);
      // The loop is initialized in clickLoop, which is a useRef() which means that it persists through renders
      clickLoopA.current = createLoop("C1", attackReleaseLengthA, rhythmA)
      clickLoopB.current = createLoop("E2", attackReleaseLengthB, rhythmB) 

      clickLoopA.current.start(0.2);
      clickLoopB.current.start(0.2);

      Tone.Transport.start(0.3);
      // sets Transport's BPM
      Tone.Transport.bpm.value = tempo;
      console.log("audio is ready");
  }
  const toggleTone = () => {
    if (isPlaying) {
      stopTone();
    } else {
      startTone();
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
  
  const changePolyrhythm = () => {
    setRhythmA(document.getElementById('text1').value + "n");
    setRhythmB(document.getElementById('text2').value + "n");
  }

  return (
    <div className="Site">
      <main className="Site-content">
      <div className="container is-fullhd pt-5 has-text-centered mb-6">
        <h2 className="title is-2">Polyrthm</h2>
        <p className="subtitle is-4">The web-based polyrhythm trainer</p>
        <div className="box mb-6">
          <Button color={buttonColor} onClick={toggleTone} isPlaying={isPlaying} spacing="mb-3" buttonContent="Click me to start!" />
          <RangeSlider {...sliderProps} min={33} max={300} step="0.5" />
        </div>
        <div className="box">
          <div className="columns">
            <div className="column">
            <input id="text1" className="input" type="text" placeholder="Note 1 (default: quarter)" />
            </div>
            <div className="column">
            <input id="text2" className="input" type="text" placeholder="Note 2 (default: quarter)" />
            </div>
          </div>
          <Button buttonContent="Change polyrhythm" onClick={changePolyrhythm}/>
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
