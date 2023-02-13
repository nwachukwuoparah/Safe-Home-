import './forgetpassword.css'
import { useRef } from 'react'
import React from 'react'
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function () {

  const inputRef = useRef('')
  const navigate = useNavigate()

  const forget = () => {
    const Email = { email: inputRef.current.value }
    console.log(Email.email)
    axios.post("https://safehomefurniture.onrender.com/api/Forget", Email)
      .then((res) => {
        console.log(res)
      }).catch((e) => {
        console.log(e)
      })
  }

  return (
    <div className='forget'>
      <div className='forget_text'>
        <h2>Forgot password?</h2>
        <p>No worries, we’ll send you reset instructions</p>
      </div>
      <input type="email" className='forget_input' ref={inputRef} placeholder="Enter your email..." />
      <button className='forget_button pointer' onClick={() => { forget() }} >Reset password</button>
      <div className='forget_back pointer' onClick={() => { navigate('/login') }} ><MdOutlineArrowBack fontSize={20} /><p>Back to login</p></div>
    </div>
  )
}
