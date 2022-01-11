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
- The issue seems to be that after a certain number of rerenders, the Tone.js audio breaks
  - I think the solution is useMemo(). Need to experiment, however


# Resources
- Renzo's covid sonification built in React and Tone
  - https://github.com/renzol2/covid19ds (code)
  - https://renzol2.github.io/covid19ds/ (app)
- Time notation
  - https://github.com/Tonejs/Tone.js/issues/374
- Commiting only certain files:
  - https://stackoverflow.com/questions/7239333/how-do-i-commit-only-some-files
- Function expressions vs declarations:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function
  - Function expressions CANNOT BE HOISTED
- Tone visual synchronization
  - https://github-wiki-see.page/m/Tonejs/Tone.js/wiki/Performance
  - "If you're using Tone.Transport, it is important that you do not make draw calls or DOM manipulations inside of the callback provided by Tone.Transport or any of the classes that extend Tone.Event (Part, Sequence, Pattern, Loop)"
- Hosting on github pages
  - https://github.com/gitname/react-gh-pages