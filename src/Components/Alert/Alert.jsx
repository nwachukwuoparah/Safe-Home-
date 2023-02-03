import './alert.css'
import React from 'react'


export default function ({ red, blue, Click, SetAlert, alert, dispach, removeItem, item }) {

  return (
    <div className='alert'>
      <div className='alert_wrap'>
        <h1>Action</h1>
        <div className='alert_button_wrap'>
          <button onClick={() => { dispach(removeItem(item)); SetAlert(!alert) }} className='alert_button1'>{red}</button>
          <button onClick={() => { SetAlert(!alert) }} className='alert_button2'>{blue}</button>
        </div>
      </div>
    </div>
  )
}