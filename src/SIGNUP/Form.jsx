import React, { useState } from 'react'

export default function Form(props) {
  const [focus, setFocus] = useState(false)

  const handleFocus = (e) => {
    setFocus(true)
  }
  return (
    <>
      <div>
        <input className='SignUp_input'
          onChange={props.onChange}
          placeholder={props.placeholder} type={props.type}
          name={props.name} 
          required={props.required}
          pattern={props.pattern}
          onBlur={handleFocus}
          onFocus={()=>{props.name === 'confirmpassword' && setFocus(true)}}
          focused={focus.toString()}
        />
        <span className='err'>{props.err}</span>
      </div>
    </>
  )
}