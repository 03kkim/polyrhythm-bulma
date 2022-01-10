import './App.sass';
import * as Tone from 'tone';
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Button } from "./components/FlashingButton";
import { Slider } from "./components/Slider";
import { RangeSlider } from "./components/RangeSlider";


function App() {
  const [buttonColor, setButtonColor] = useState("");
  const [isPlaying, setIsPlaying] = useState(false); 
  const [tempo, setTempo] = useState(60);
  const synthA = new Tone.FMSynth().toDestination();
  const [parentVal, setParentVal] = useState(60);
  
        const sliderValueChanged = useCallback(val => {
          console.log("NEW VALUE", val);
          setParentVal(val);
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
    // console.log(event.target.value);
    // sets the the variable "tempo" == "value" attribute of the slider
    // setTempo(event.target.value);
    // setTempo(document.getElementById("tempoSlider").value);
    Tone.Transport.bpm.rampTo(parentVal, 0.1);
    // console.log(tempo);
  };
  useEffect(() => {
    updateTempo()
  }, [parentVal]);
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
        currentBeat.current = currentBeat.current + 1;
        changeButtonColor();
      }, subdivisionLength);
      clickLoop.current.start(1);
      Tone.Transport.start();
      // sets Transport's BPM
      Tone.Transport.bpm.value = parentVal;
      console.log("audio is ready");
    }
  }
  // document.querySelector('button')?.addEventListener('click', async () => {
  //   await Tone.start();
  //   return('ahslkjdhlas')
  //   startTone();
  // })
  const sliderProps = useMemo(
    () => ({
      min: 0,
      max: 100,
      value: parentVal,
      step: 2,
      label: "This is a reusable slider",
      onChange: e => sliderValueChanged(e)
    }),
    [parentVal]
  );
  return (
    <div>
      <div className="box has-text-centered">
        <Button color={buttonColor} onClick={startTone} isPlaying={isPlaying} />
      </div>
      <Slider onChange={updateTempo} defaultValue={tempo} min={33} max={300} step="1" id="tempoSlider"/>
      <h1>{tempo}</h1>
      {/* <Button color="success" onClick={updateTempo} /> */}
      <h1>{parentVal}</h1>
      <RangeSlider {...sliderProps} min={33} max={300} />
      
    </div>
  );
}

export default App;
