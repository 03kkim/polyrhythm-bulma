import './App.sass';
import * as Tone from 'tone';
import { useState, useEffect, useRef } from "react";
import { Button } from "./FlashingButton";

function App() {
  const [buttonColor, setButtonColor] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const synthA = new Tone.FMSynth().toDestination();
  const clickLoop = useRef(null);

  const subdivisionLength = "32n";
  const attackReleaseLength = parseInt(subdivisionLength.replace('n', '') * 2).toString() + "n";
  /**
   * CREDIT TO RENZO (renzol2) FOR FIGURING THIS OUT
   * Changes button color based on time:
   * - if round(time) is odd, make it normal
   * - if round(time) is even, make it a warning
   * @param {Number} time current time of loop
   */
  function changeButtonColor(time) {
    console.log(buttonColor);
    const timeInt = Math.round(time);
    console.log("Color change: " + time);
    console.log("bruh:" + attackReleaseLength)
    if (timeInt % 2 === 0) {
      setButtonColor("warning");
    } else {
      setButtonColor("");
    }
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
        changeButtonColor(time);
      }, subdivisionLength);
      clickLoop.current.start(0);
      Tone.Transport.start();
      console.log("audio is ready");
    }
  }

  return (
    <div>
      <div className="box has-text-centered">
        <Button color={buttonColor} onClick={startTone} isPlaying={isPlaying} />
      </div>
    </div>
  );
}

export default App;
