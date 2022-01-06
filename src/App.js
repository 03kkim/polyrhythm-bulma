import './App.sass';
//import bulmaSlider from 'bulma-extensions/bulma-slider/dist/js/bulma-slider.min.js';
//import 'bulma-extensions/bulma-slider/dist/css/bulma-slider.min.css';
import { bulmaSlider } from 'bulma-extensions/bulma-slider/dist/js/bulma-slider';
import * as Tone from 'tone';
import { useState, useEffect } from 'react';
import { Button } from './FlashingButton';
function App() {
  const [buttonColor, setButtonColor] = useState("");
  let synth = new Tone.Synth().toDestination();

  const synthA = new Tone.FMSynth().toDestination();
  function attackAndChangeColor(time) {
    synthA.triggerAttackRelease("C2", "16n", time);
    changeButtonColor();
  }

  async function startTone() {
    await Tone.start();
    Tone.Transport.start();
    console.log('audio is ready');
  }
  const changeButtonColor = () => {
    if (buttonColor === "warning") {
      setButtonColor("");
    } else {
      setButtonColor("warning");
      //synth.triggerAttackRelease("C4", "32n");
    }
  }

  useEffect (() => {
    const loopA = new Tone.Loop(time => {
      attackAndChangeColor(time);
    }, "1n").start(0);
  }, []);

  return (
    <div>
      <div className="box has-text-centered">
        <Button color={buttonColor} onClick={startTone} />
      </div>
    </div>

  );
}

export default App;
