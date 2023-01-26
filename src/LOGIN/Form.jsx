import React, { useRef, useEffect, useState } from 'react'



export default function Form(props) {


  const [focus, setFocus] = useState(false)

  const handleFocus = (e) => {
    setFocus(true)
  }

  return (
    <>
      <div>
        <input
          onChange={props.onChange}
          className='login_input'
          placeholder={props.placeholder} 
          type={props.type}
           name={props.name}
          required={props.required}
          pattern={props.pattern}
          onBlur={handleFocus}
          focused={focus.toString()}
        />
        <span className='login_err'>{props.err}</span>
      </div>
    </>
  )
}

