export function Button(props) {
    let classThing = props.color === "" ? "button" : "button" + " is-" + props.color;

    return <button className={classThing} onClick = {props.onClick}>Button</button>
}