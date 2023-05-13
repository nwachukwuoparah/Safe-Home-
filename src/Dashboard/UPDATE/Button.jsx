import React, { useState, useEffect } from 'react'
import './update.css'
export default function Button(props) {
  const [active, setActive] = useState(true)

  // useEffect(() => {
  //   console.log(active)

  // }, [active])


  return (
    <>
      <button className='update_button' onClick={() => { setActive(!active); props.addinput(props.title, active) }}>{props.title}</button>
    </>
  )
}
