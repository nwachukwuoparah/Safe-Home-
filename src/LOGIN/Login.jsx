import './login.css'
import React, { useState, useContext, useEffect, useRef } from 'react'
import Form from './Form'
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../Components/ContexApi/Contex';
import { HiHome } from "react-icons/hi";
export default function Login({ }) {
  const [view, setView] = useState(false)
  const inputRef = useRef('')
  const { changeTheme, display } = useContext(ThemeContext)
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
      type: view ? "text" : "password",
      name: "Password",
      err: "forget password",
    }
  ]

  const [focus, setFocus] = useState(false)

  const handleFocus = (e) => {
    setFocus(true)
  }

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    !display && changeTheme()
  }, [])
  return (
    <div className='login_in'>
      <HiHome onClick={() => { Navigate('/') }} className='login_Home pointer' />
      <div className='login_in_Wrap'>
        <div className='login_in_Wrap_head'>
          <img className='pointer' onClick={() => { Navigate('/') }} style={{ width: 200 }} src='/Union.svg' />
          <h1> Log into account</h1>
        </div>

        <form className='form_wrap' onSubmit={() => { event.preventDefault(); }}>
          {input.map((i) => (
            <Form key={i.id} {...i} view={view} setView={setView} />
          ))}

          <div className='login_action'>
            <button className='login_button pointer'  >Sign in</button>
            <span className='login_label'><p>Don’t have an account?</p> <p className='pointer' style={{ color: "#0056FC" }} onClick={() => Navigate('/signUp')}>Sign up</p></span>
          </div>
        </form>


      </div>
    </div>
  )

}