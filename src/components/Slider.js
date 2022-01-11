export const Slider = (props) => {
    return (
        <input 
        // change as needed
      defaultValue={props.value} 
      type='range' 
      onChange={props.volume}
      {...props}>
    </input>
    )
}