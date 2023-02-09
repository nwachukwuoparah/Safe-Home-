import './login.css'
import React, { useState, useContext, useEffect, useRef } from 'react'
import Form from './Form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../Components/ContexApi/Contex';
import { HiHome } from "react-icons/hi";
export default function Login({ }) {
  const [view, setView] = useState(false)
  const inputRef = useRef('')
  const { changeTheme, display, setactiveuser } = useContext(ThemeContext)
  const Navigate = useNavigate()
  const [value, setValue] = useState({
    email: "",
    password: ""
  })

  const userSign = () => {
    axios.post(`https://safehomefurniture.onrender.com/api/adminLogin`, value)
      .then(function (res) {
        console.log(res)
        res.status === 201 ? Navigate('/') : null
        res.status === 201 ? setactiveuser(res) : null
      })
      .catch(function (error) {
        console.log(error);
      });
  }


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
            <Form key={i.id} {...i} view={view} setView={setView} onChange={onChange} />
          ))}

          <div className='login_action'>
            <button onClick={() => { userSign() }} className='login_button pointer'>Sign in</button>
            <span className='login_label'><p>Don’t have an account?</p> <p className='pointer' style={{ color: "#0056FC" }} onClick={() => Navigate('/signUp')}>Sign up</p></span>
          </div>
        </form>
      </div>
    </div>

  )

}