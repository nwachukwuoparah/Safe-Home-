import React, { useEffect, useContext, useState } from 'react'
import { ThemeContext } from '../Components/ContexApi/Contex'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function () {
  const { id } = useParams()
  console.log(id)
  const { changeTheme, display, setactiveuser } = useContext(ThemeContext)
  const navigate = useNavigate()
  const [state, setState] = useState(false)

  const verify = async () => {
    const res = await axios.post(`https://safehomefurniture.onrender.com/api/userVerify/${id}`)
    console.log(res)
    setState(true)
    setTimeout(() => {
      navigate('/login')
    }, 3000);
  }

  useEffect(() => {
    !display && changeTheme()
    verify()
  }, [])
  const style = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  }
  return (
    <div style={style} className='verify'>
      {!state ? <h1>Waiting.....</h1> :
        <h1>Your verification was sucessful</h1>}
    </div >
  )
}