import './signup.css'
import React, { useState ,useEffect,useContext} from 'react'
import { input } from './input'
import Form from './Form'
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../Components/ContexApi/Contex';
export default function Signup({ }) {
  const { changeTheme } = useContext(ThemeContext)
  const [checked, setChecked] = useState(false)
  const Navigate = useNavigate()
  const [brand, setBrand] = useState(input)
  const [value, setValue] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    admin: false,
    brandName: "",
  })

  const agent = () => {
    if (!checked) {
      const Val = [...brand, {
        id: 5,
        placeholder: "Brand Name",
        type: "number",
        name: "Brand Name"
      }
      ]
      setBrand(Val)
    } else {
      setBrand(input)
    }

  }

useEffect(() => {
  // console.log(brand)
}, [checked])
  return (
    <>
      <div className='sign_in'>
        <div className='sign_in_Wrap'>
          <div className='sign_in_Wrap_head'>
            <img  onClick={()=>{ Navigate('/');  changeTheme(); }} style={{ width: 200 }} src='/Union.svg' />
            <h1> Create an account</h1>
          </div>
          <form>
            {brand.map((i) => (
              <Form key={i.id} {...i} />
            ))}
            <div className='check'>
              <label className='label'><input type="checkbox"
                onChange={() => {
                  setChecked(!checked)
                  agent()
                }}
              /> <p>sign up as our Agent(Optional)</p></label>
              <label className='label'><input type="checkbox" /> <span className='label'><p>I Agree to the </p> <p style={{ color: "#0056FC" }}>Terms & Privacy Policy</p></span></label>
            </div>

            <div className='Signup_action'>
              <button className='button'
              onClick={()=>{
                event.preventDefault()
             }} 
              >Sign up</button>
              <span className='label'><p>Already have an account?</p> <p style={{ color: "#0056FC" }} onClick={() => Navigate('/login')}>Sign in </p></span>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}
