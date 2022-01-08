# Todos
- Implement tempo slider


# Issues
- Can't seem to use the tone transport to sync visual changes (breaks the web audio)
  - Fixed it! On Github issues thread
- Need to be able to execute the loop such that the color changes with the loop without needing to rerender
  - The reason it's not working is because the call to attackAndChangeColor() is still happening within the UseEffect() in the stack, meaning it's not rerendering even though everything is defined outside (because it's called inside UseEffect)
  - FIXED!! THANKS RENZO (https://codesandbox.io/s/gallant-meninsky-k9pxe?file=/src/App.js)
- Renzo's solution used the (time) parameter and some math, but floating point error made it very hard if not impossible to deal with more complex tuplets
  - Solution: Use a useRef() hook to keep track of the beats, eliminating the need for time math completely
- Implementing a working slider to control tempo


# Resources
- Renzo's covid sonification built in React and Tone
  - https://github.com/renzol2/covid19ds (code)
  - https://renzol2.github.io/covid19ds/ (app)
- Time notation
  - https://github.com/Tonejs/Tone.js/issues/374
- Commiting only certain files:
  - https://stackoverflow.com/questions/7239333/how-do-i-commit-only-some-files
- A working volume slider using Tone and React:
  - https://stackoverflow.com/questions/63595019/how-to-enable-volume-slider-of-player-tone-js-inside-of-useeffect-hookreact
  - https://codesandbox.io/s/web-audio-api-playground-v2-forked-y1dc6?file=/src/components/DrumMachine.js
- 