import './login.css'
import React, { useState, useContext, useEffect, useRef } from 'react'
import Form from './Form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../Components/ContexApi/Contex';
import { addUser } from '../REDUX/features';
import { clearUser } from '../REDUX/features';
import { useDispatch, useSelector } from 'react-redux';
import { HiHome } from "react-icons/hi";
export default function Login({ }) {
  const dispach = useDispatch()
  const [view, setView] = useState(false)
  const [loader, setLoader] = useState(false)
  const inputRef = useRef('')
  const [err, setErr] = useState('')
  const [herr, setHerr] = useState(false)
  const { changeTheme, display, verifyAlert, login_alert } = useContext(ThemeContext)
  const user = useSelector((state) => state.Commerce.user)
  const Navigate = useNavigate()
  const [value, setValue] = useState({
    email: "",
    password: ""
  })

  const logOut = async () => {
    const res = await axios.post(`https://safehomefurniture.onrender.com/api/logout/${user[0]?.data.data._id}`)
    console.log(res.data)
    res.status === 200 ? dispach(clearUser()) : null
    res.status === 200 ? Navigate('/login') : null
    login_alert()
  }

  const userSign = async () => {
    await axios.post("https://safehomefurniture.onrender.com/api/doctorlogin", value)
      .then(function (res) {
        // console.log(res.data)
        res.data.data.email === value.email ? dispach(addUser(res)) : null
        setLoader(false)
        if (res.data.data.verify === true) {
          res.data.data.email === value.email ? Navigate('/') : null
        } else {
          logOut()
          setLoader(false)
        }
      })
      .catch(function (error) {
        console.log(error);
        Navigate('/login')
        setErr(error.response.data.message)
        setLoader(false)
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


  useEffect(() => {
    setHerr(true)
    setTimeout(() => {
      setHerr(false)
    }, 5000);
  }, [err])

  return (

    <div className='login_in'>
      {verifyAlert && <a className='verifyAlert' href={'https://mail.google.com'}>please click here or check your Email for a verification link</a>}

      <HiHome onClick={() => { Navigate('/') }} className='login_Home pointer' />
      <div className='login_in_Wrap'>
        <div className='login_in_Wrap_head'>
          <img className='pointer' onClick={() => { Navigate('/') }} style={{ width: 200 }} src='/Union.svg' />
          <h1> Log into account</h1>
        </div>
        {herr && <p style={{ color: 'red' }}>{err}</p>}
        <form className='form_wrap' onSubmit={
          () => {
            event.preventDefault();
            userSign()
            setLoader(true)
          }}>
          {input.map((i) => (
            <Form key={i.id} {...i} view={view} setView={setView} onChange={onChange} />
          ))}

          <div className='login_action'>
            <button className='login_button pointer'>Sign in</button>
            {/* {loader && <button className='login_button pointer'><div className="loader"></div> </button>} */}
            <span className='login_label'><p>Don’t have an account?</p> <p className='pointer' style={{ color: "#0056FC" }} onClick={() => Navigate('/signUp')}>Sign up</p></span>
          </div>
        </form>
        {loader&& <button className='login_loading_button pointer'><div className="loader"></div> </button>}
      </div>
    </div>
  )

}