import './login.css'
import React, { useState, useContext, useEffect, useRef } from 'react'
import Form from './Form'
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../Components/ContexApi/Contex';
import { HiHome } from "react-icons/hi";
export default function Login({ }) {
  const [view, setView] = useState(false)
  const inputRef = useRef('')
  const { changeTheme, display, setactiveuser, users } = useContext(ThemeContext)
  const Navigate = useNavigate()
  const [value, setValue] = useState({
    email: "",
    password: ""
  })
  const input = [
    {
      id: 1,
      placeholder: "Email",
      type: "email",
      name: "email",
      err: "not a valid email",
      required: true
    },
    {
      id: 2,
      placeholder: "Password",
      type: view ? "text" : "password",
      name: "password",
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
  // console.log("grace1224#" === "grace1224")
  const checkUser = () => {
    const item = users.map((i) => {
      if (i.email === value.email) {
        if (i.password === value.password)
          setactiveuser(i)
        Navigate("/")
      } else {
        Navigate("/signUp")
      }

    })
  }
  return (

    <div className='login_in'>
      <HiHome onClick={() => { Navigate('/') }} className='login_Home pointer' />
      <div className='login_in_Wrap'>
        <div className='login_in_Wrap_head'>
          <img className='pointer' onClick={() => { Navigate('/') }} style={{ width: 200 }} src='/Union.svg' />
          <h1> Log into account</h1>
        </div>

        <form className='form_wrap' onSubmit={() => { event.preventDefault(); checkUser() }}>
          {input.map((i) => (
            <Form key={i.id} {...i} view={view} setView={setView} onChange={onChange} />
          ))}

          <div className='login_action'>
            <button className='login_button pointer'>Sign in</button>
            <span className='login_label'><p>Don’t have an account?</p> <p className='pointer' style={{ color: "#0056FC" }} onClick={() => Navigate('/signUp')}>Sign up</p></span>
          </div>
        </form>
      </div>
    </div>

  )

}