import './forgetpassword.css'
import { useRef, useContext,useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import React from 'react'
import axios from 'axios'
import { ThemeContext } from '../Components/ContexApi/Contex'
export default function () {
  const { changeTheme, display } = useContext(ThemeContext)
  const navigate = useNavigate()
  const inputRef = useRef('')
  const { id } = useParams()
  console.log(id)
  const forget = async () => {
    const res = await axios.post(`https://safehomefurniture.onrender.com/api/adminChng/${id}`, { password: inputRef.current.value })
    res.status === 200 ? navigate('/login') : null
    console.log(res)
  }

  useEffect(() => {
    !display && changeTheme()
  }, [])

  return (
    <div className='forget'>
      <div className='forget_text'>
        <h2>New password</h2>
      </div>
      <input className='forget_input' ref={inputRef} placeholder="Enter your new password..." />
      <button className='forget_button pointer' onClick={() => { forget() }} >Change password</button>
    </div>
  )
}
