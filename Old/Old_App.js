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
    synthA.triggerAttackRelease("C2", "32n", time);
    setButtonColor("warning");
    console.log(buttonColor);
  }

  const changeButtonColor = () => {
    if (buttonColor === "warning") {
      setButtonColor("");
    } else {
      setButtonColor("warning");
    }
  }

  useEffect (() => {
    const loopA = new Tone.Loop(time => {
      attackAndChangeColor(time);
    }, "1n").start(1);
  }, []);

  async function startTone() {
    await Tone.start();
    Tone.Transport.start();
    console.log('audio is ready');
  }

  return (
    <div>
      <div className="box has-text-centered">
        <Button color={buttonColor} onClick={startTone} />
      </div>
    </div>

  );
}

export default App;