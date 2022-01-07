import './App.sass';
import * as Tone from 'tone';
import { useState, useEffect, useRef } from "react";
import { Button } from "./FlashingButton";

function App() {
  const [buttonColor, setButtonColor] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const synthA = new Tone.FMSynth().toDestination();
  const clickLoop = useRef(null);

  /**
   * Changes button color based on time:
   * - if round(time) is odd, make it normal
   * - if round(time) is even, make it a warning
   * @param {Number} time current time of loop
   */
  function changeButtonColor(time) {
    console.log(buttonColor);
    const timeInt = Math.round(time);
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
      clickLoop.current = new Tone.Loop((time) => {
        synthA.triggerAttackRelease("C2", "32n", time);
        console.log(time);
        changeButtonColor(time);
      }, "2n");
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
