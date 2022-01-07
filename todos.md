# Todos
- Implement tempo slider


# Issues
- Can't seem to use the tone transport to sync visual changes (breaks the web audio)
  - Fixed it! On Github issues thread
- Need to be able to execute the loop such that the color changes with the loop without needing to rerender
  - The reason it's not working is because the call to attackAndChangeColor() is still happening within the UseEffect() in the stack, meaning it's not rerendering even though everything is defined outside (because it's called inside UseEffect)
  - FIXED!! THANKS RENZO (https://codesandbox.io/s/gallant-meninsky-k9pxe?file=/src/App.js)


# Resources
- Renzo's covid sonification built in React and Tone
  - https://github.com/renzol2/covid19ds (code)
  - https://renzol2.github.io/covid19ds/ (app)