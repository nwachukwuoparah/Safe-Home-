import React, { useRef, useEffect, useState } from 'react'
import { MdRemoveRedEye } from "react-icons/md";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
export default function Form(props) {
  const navigate = useNavigate()
  const [focus, setFocus] = useState(false)

  const handleFocus = (e) => {
    setFocus(true)
  }
  return (
    <>
      <div style={{ marginTop: props.name === "password" ? 30 : null}} className='form_input_wrap'>
        <div className='login_input_warp'>
          <input className='login_input'
          style={{ backgroundColor: focus? '#f8f8f8':''}}
            onChange={props.onChange}
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
        {props.name === "password" ? props.view ? <AiOutlineEyeInvisible fontSize={20} className='login_eye pointer' onClick={() => { props.setView(!props.view) }} /> : <MdRemoveRedEye fontSize={20} className='login_eye pointer' onClick={() => { props.setView(!props.view) }} /> : null}
      </div>
      {props.name === 'password' ? <p className='forgot pointer' onClick={() => {navigate('/forgetpassword')}} >Forgot password?</p> : null}
    </>
  )
}

