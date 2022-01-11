import './App.sass';
import * as Tone from 'tone';
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Button } from "./components/FlashingButton";
import { RangeSlider } from "./components/RangeSlider";


function App() {
  const [buttonColor, setButtonColor] = useState("");
  const [isPlaying, setIsPlaying] = useState(false); 
  const [tempo, setTempo] = useState(60);

  const synthA = new Tone.FMSynth().toDestination();
  const sliderValueChanged = useCallback(val => {
    console.log("NEW VALUE", val);
    setTempo(val);
  });

  const clickLoop = useRef(null);
  // keeps track of current beat 
  const currentBeat = useRef(0);

  const subdivisionLength = "4n";
  const attackReleaseLength = parseInt(subdivisionLength.replace('n', '') * 2).toString() + "n";
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
    Tone.Transport.bpm.rampTo(tempo, 1);
  };
  useEffect(() => {
    updateTempo()
  }, [tempo]);

  const startTone = () => {
    if (isPlaying) {
      setIsPlaying(false);
      clickLoop.current.dispose();
      Tone.Transport.cancel();
      console.log("stop audio");
    } else {
      setIsPlaying(true);
      // The loop is initialized in clickLoop, which is a useRef() which means that it persists through renders
      clickLoop.current = new Tone.Loop((time) => {
        synthA.triggerAttackRelease("C2", attackReleaseLength, time);
        console.log(time);
        Tone.Draw.schedule(() => {
          currentBeat.current = currentBeat.current + 1;
          // changeButtonColor();
        }, time)
        
      }, subdivisionLength);
      clickLoop.current.start("+0.1");
      Tone.Transport.start("+0.1");
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
    <>
    <div className="container is-fluid pt-5 has-text-centered pb-6">
      <h2 className="title is-2">Polyrthm</h2>
      <p className="subtitle is-4">The web-based polyrhythm trainer</p>
      <div className="box">
        <Button color={buttonColor} onClick={startTone} isPlaying={isPlaying} />
        <RangeSlider {...sliderProps} min={33} max={300} step="0.5" />
      </div>
    </div>
    <footer className="footer">
      <div className="content has-text-centered">
        <strong>Polyrthm</strong> by <a href="https://github.com/03kkim">Kyu Hong Kim</a>
        </div>
    </footer>
    </>
  );
}

export default App;
