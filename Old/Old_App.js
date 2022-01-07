// The old App.js file before commits 81b3e64ead80a22f8312f9ad0b0563a8a185a44c and aa107e036da60af10a7561579094c08a8c8d7bfc

// Here for reference and to compare what has changed immediately after those commits

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