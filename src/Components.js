import "./components.css"
export function Button(props) {
    let classThing = props.color === "" ? "button" : "button" + " is-" + props.color;

    return <button className={classThing} onClick = {props.onClick}>{props.name}</button>
}
export function Slider(props) {
    return (
        // slider and css credit to https://www.w3schools.com/jsref/jsref_tostring_number.asp
        <div className="slidecontainer">
            <input id = "slider" type="range" min="1" max="100" defaultValue={props.defaultValue} className="slider" onInput={props.onInput}></input>
        </div>
    )
    
}