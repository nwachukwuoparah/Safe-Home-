import './login.css'
import React, { useState, useContext, useEffect, useRef } from 'react'
import Form from './Form'
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../Components/ContexApi/Contex';
import { HiHome } from "react-icons/hi";
export default function Login({ }) {
  const inputRef = useRef('')
  const { changeTheme, theme } = useContext(ThemeContext)
  const Navigate = useNavigate()
  const [value, setValue] = useState({
    Email: "",
    Password: ""
  })
  const input = [
    {
      id: 1,
      placeholder: "Email",
      type: "email",
      name: "Email",
      err: "not a valid email",
      required: true
    },
    {
      id: 2,
      placeholder: "Password",
      type: "password",
      name: "Password",
      err: "Password must include upper case ",
    }
  ]

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    !theme && changeTheme()
  }, [])
  return (
    <>
      <div className='login_in'>
        <HiHome  onClick={() => { Navigate('/') }} className='login_Home' />
        <div className='login_in_Wrap'>
          <div className='login_in_Wrap_head'>
            <img onClick={() => { Navigate('/') }} style={{ width: 200 }} src='/Union.svg' />
            <h1> Create an account</h1>
          </div>
          <form onSubmit={
            () => {
              event.preventDefault(); console.log(value)
            }
          }>
            {input.map((i) => (
              <Form key={i.id} {...i} value={value} onChange={onChange} />
            ))}

            <div className='login_action'>
              <button className='login_button'>Sign in</button>
              <span className='login_label'><p>Don’t have an account?</p> <p style={{ color: "#0056FC" }} onClick={() => Navigate('/signUp')}>Sign up</p></span>
            </div>
          </form>
        </div>
      </div>
    </>
  )

}