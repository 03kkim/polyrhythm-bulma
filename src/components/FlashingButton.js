export function Button(props) {
    let classThing = props.color === "" ? "button" + " " + props.spacing : "button" + " is-" + props.color + " " + props.spacing;
    return <button className={classThing} onClick = {props.onClick} >{props.buttonContent}</button>
}