import './App.sass';
import * as Tone from 'tone';
import { useState, useEffect, useRef } from "react";
import { Button, Slider } from "./components";

function App() {
  const [buttonColor, setButtonColor] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const synthA = new Tone.FMSynth().toDestination();
  const clickLoop = useRef(null);
  // keeps track of current beat 
  const currentBeat = useRef(0);
  const [currentTempo, setTempo] = useState(60);

  const subdivisionLength = "5n";
  const attackReleaseLength = parseInt(subdivisionLength.replace('n', '') * 2).toString() + "n";

  const [sliderValue, setSliderValue] = useState(50);

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

  function startTone() {
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
        currentBeat.current = currentBeat.current + 1;
        changeButtonColor();
      }, subdivisionLength);
      clickLoop.current.start(0);
      Tone.Transport.start();
      // sets Transport's BPM
      Tone.Transport.bpm.value = currentTempo;
      console.log("audio is ready");
    }
  }
  function updateSliderValue() {
    setSliderValue(document.getElementById("slider").value);
  }
  // useEffect(() => {
  //   updateSliderValue();
  // },[sliderValue])
  return (
    <div>
      <div className="box has-text-centered">
        <Button color={buttonColor} onClick={startTone} isPlaying={isPlaying} name="main button" />
      </div>
      <Slider defaultValue={currentTempo} onInput={updateSliderValue}></Slider>
      <h1>{sliderValue}</h1>
      <Button color="success" name="change tempo" />
    </div>
  );
}

export default App;
