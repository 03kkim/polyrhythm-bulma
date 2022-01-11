// Original code credit to Kalhan.Toress: https://stackoverflow.com/questions/62725470/creat-range-slider-in-react-js

import React, {
    memo,
    useState,
    useEffect,
  } from "react";

export const RangeSlider = memo(
({ classes, label, onChange, value, ...sliderProps }) => {
    const [sliderVal, setSliderVal] = useState(0);
    const [mouseState, setMouseState] = useState(null);

    useEffect(() => {
    setSliderVal(value);
    }, [value]);

    const changeCallback = e => {
    setSliderVal(e.target.value);
    };

    useEffect(() => {
    if (mouseState === "up") {
        onChange(sliderVal);
    }
    }, [mouseState]);
    console.log("RENDER");
    return (
    <div className="range-slider">
        <p>{label}</p>
        <h3>Quarter = {sliderVal}</h3>
        <input
        type="range"
        value={sliderVal}
        {...sliderProps}
        className={`slider ${classes}`}
        id="myRange"
        onChange={changeCallback}
        onMouseDown={() => setMouseState("down")}
        onMouseUp={() => setMouseState("up")}
        />
    </div>
    );
}
);
