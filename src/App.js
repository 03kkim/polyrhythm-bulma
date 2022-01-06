import './App.sass';
//import bulmaSlider from 'bulma-extensions/bulma-slider/dist/js/bulma-slider.min.js';
//import 'bulma-extensions/bulma-slider/dist/css/bulma-slider.min.css';
import { bulmaSlider } from 'bulma-extensions/bulma-slider/dist/js/bulma-slider';
import * as Tone from 'tone';
import { useState, useEffect } from 'react';
import { Button } from './FlashingButton';
function App() {
  const [buttonIsOn, setButtonIsOn] = useState(false);
  const [buttonColor, setButtonColor] = useState("");
  let synth = new Tone.Synth().toDestination();

  // document.querySelector('button')?.addEventListener('click', async () => {
  //   // await Tone.start();
  //   const d = new Date();
  //   let time = d.getTime();
  //   // console.log('audio is ready: ' + time);
  //   console.log('audio is ready');
  // });
  // document.querySelector('button')?.addEventListener('click', async () => {
  //   await Tone.start();
  //   console.log('audio is ready');
  // });
  // document.querySelector('button').addEventListener('click', () => console.log('hi'));
  // async function startTone() {
  //   await Tone.start();
  //   console.log('audio is ready');
  // }
  async function startTone() {
    await Tone.start();
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
  const switchButton = () => {
    setButtonIsOn(buttonIsOn === false ? true : false);
  }
  // const loopA = new Tone.Loop(time => {
  //   changeButtonColor()}, "4n").start(0);
  // Tone.Transport.start();
  
    // useEffect(() => {
    //   Tone.Transport.start();
    //   return () => {
        
    //   }
    // })
  
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     changeButtonColor()}, 1000);
  //     return () => clearInterval(interval);
  // });
  return (
    <div>
      <div className="box has-text-centered">
        <Button color={buttonColor} onClick={startTone} />
      </div>
    </div>

  );
}

export default App;
