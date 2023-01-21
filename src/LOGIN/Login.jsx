import './login.css'
import React, { useState ,useContext} from 'react'
import Form from './Form'
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../Components/ContexApi/Contex';
export default function Login({ }) {
  const { changeTheme } = useContext(ThemeContext)
  const Navigate = useNavigate()
  const [value, setValue] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const input = [
    {
      id: 2,
      placeholder: "Email",
      type: "text",
      name: "Email"
    }, {
      id: 3,
      placeholder: "Password",
      type: "number",
      name: "Password"
    }
  ]

  return (
    <>
      <div className='login_in'>
        <div className='login_in_Wrap'>
          <div className='login_in_Wrap_head'>
            <img onClick={()=>{ Navigate('/');  changeTheme(); }}style={{ width: 200 }} src='/Union.svg' />
            <h1> Create an account</h1>
          </div>
          <form>
            {input.map((i) => (
              <Form key={i.id} {...i} />
            ))}

            <div className='login_action'>
              <button onClick={()=>{
                 event.preventDefault()
              }} className='login_button'>Sign in</button>
              <span className='login_label'><p>Don’t have an account?</p> <p style={{ color: "#0056FC" }} onClick={() => Navigate('/signUp')}>Sign up</p></span>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}