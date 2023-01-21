import React from 'react'

export default function Form({placeholder,type}) {

  return (
    <>
      <div>
        <input className='SignUp_input' placeholder={placeholder} type={type}/>
      </div>
    </>
  )
}