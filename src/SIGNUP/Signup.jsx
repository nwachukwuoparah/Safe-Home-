import './signup.css'
import React, { useState, useEffect, useContext } from 'react'
import Form from './Form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../Components/ContexApi/Contex';
import { HiHome } from "react-icons/hi";
export default function Signup({ }) {
  const [view, setView] = useState(false)
  const { changeTheme, display, setUsers, login_alert } = useContext(ThemeContext)
  const [checked, setChecked] = useState(false)
  const [terms, setTerms] = useState(false)
  const Navigate = useNavigate()
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    admin: false,
    brandname: "",
  })
  const { name, email, password, brandname } = value
  const userData = { name, email, password, brandname }

  const adminSign = () => {
    axios.post(`https://safehomefurniture.onrender.com/api/adminSign`, userData)
      .then(function (res) {
        // console.log(res)
        res.status === 201 ? Navigate('/login') : null
        login_alert()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const userSign = () => {
    // axios.post(`https://safehomefurniture.onrender.com/api/sign`, userData)
    console.log(userData)
      .then(function (res) {
        // console.log(res)
        res.status === 201 ? Navigate('/login') : null
        login_alert()
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  const input = [
    {
      id: 1,
      name: "name",
      type: "text",
      err: "Username should be 3-16 caharters and should not include any special charater!",
      placeholder: "name",
      pattern: "^[A-Za-z0-9 ]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      err: "It should be a valid email address!",
      placeholder: "email",
      required: true,
    }, {
      id: 3,
      name: "password",
      type: view ? "text" : "Password",
      err: "Password should be 8-20 charaters and include at least 1 letter, 1 number and one special charater! ",
      placeholder: "password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    }
    // , {
    //   id: 4,
    //   name: "confirmPassword",
    //   type: view ? "text" : "password",
    //   err: "Password dont match",
    //   placeholder: " confirmPassword",
    //   // pattern: value.password,
    //   // required: true,
    // }
  ]
  const [brand, setBrand] = useState(input)

  const adminC = () => {
    if (value.admin) {
      setBrand([...input, {
        id: 5,
        name: "brandname",
        type: "text",
        err: "Brand name should be 3-16 caharters and should not include any special charater!",
        placeholder: "brand name",
        pattern: "^[A-Za-z0-9]{3,16}$",
        required: true,
      }])

    } else if (view) {
      setBrand(input)
    } else {
      setBrand(input)
    }
  }


  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    adminC()
  }, [checked, value, view])

  useEffect(() => {
    !display && changeTheme()
  }, [])

  return (
    <>
      <div className='sign_in'>
        <HiHome onClick={() => { Navigate('/') }} className='signup_Home pointer' />
        <div className='sign_in_Wrap'>
          <div className='sign_in_Wrap_head'>
            <img className='pointer' onClick={() => { Navigate('/') }} style={{ width: 200 }} src='/Union.svg' />
            <h1> Create an account</h1>
          </div>
          <form className='sign_form' onSubmit={(e) => { e.preventDefault(); }}>
            {brand.map((i) => (
              <Form key={i.id} {...i} value={value[i.name]} onChange={onChange} setView={setView} view={view} />
            ))}

            <div className='check'>
              <label className='label'><input className='pointer' type="checkbox"
                // checked={checked}
                onChange={() => { setValue({ ...value, admin: !value.admin }) }}
              /> <p>sign up as our Agent(Optional)</p></label>
              <label className='label'><input className='pointer' type="checkbox"
                onChange={() => { setTerms(!terms) }}
              /> <span className='label'><p>I Agree to the </p> <p style={{ color: "#0056FC" }} className="pointer">Terms & Privacy Policy</p></span></label>
            </div>

            <div className='Signup_action'>
              {value.admin ? <button onClick={() => { adminSign() }} className='button pointer'>Admin</button> : <button onClick={() => { userSign() }} className='button pointer'>Sign up</button>}
              <span className='label'><p>Already have an account?</p> <p style={{ color: "#0056FC" }} onClick={() => Navigate('/login')} className="pointer">Sign in </p></span>
            </div>

          </form>
        </div>
      </div >
    </>
  )
}
