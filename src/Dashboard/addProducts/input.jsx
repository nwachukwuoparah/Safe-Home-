
import { useState } from "react"


const Input = (props) => {


  const [focus, setFocus] = useState(false)

  const handleFocus = (e) => {
    setFocus(true)
  }
  return <label className='label'>
    <p>{props.title}</p>
    <input className='label_input'
      required={props.required}
      pattern={props.pattern}
      onBlur={handleFocus}
      focused={focus.toString()}
      type={props.type}
      name={props.name}
      onChange={(e) => { props.setProduct({ ...props.product, [e.target.name]: e.target.value }) }} />
    <p className='err'>{props.err}</p>
  </label>
}

export default Input