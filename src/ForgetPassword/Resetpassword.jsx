import './forgetpassword.css'
import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import React from 'react'


export default function () {
  const inputRef = useRef('')
const {id}= useParams()

  const forget = async ()=>{
    const res = await axios.post(`https://safehomefurniture.onrender.com/api${id}`)
    console.log(res)
  }

  return (
    <div className='forget'>
      <div className='forget_text'>
        <h2>New password</h2>
      </div>
      <input className='forget_input' ref={inputRef} placeholder="Enter your new password..." />
      <button className='forget_button pointer' >Change password</button>
    </div>
  )
}
