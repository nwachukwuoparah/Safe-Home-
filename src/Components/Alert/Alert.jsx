import './alert.css'
import React from 'react'


export default function ({ red, blue, Click, SetAlert, alert, dispach, removeItem, item, dell, items }) {

  return (
    <div className='alert'>
      <div className='alert_wrap'>
        <h1>Action</h1>
        <div className='alert_button_wrap'>
          <button onClick={() => {
            if (items) {
              console.log(items._id)
              SetAlert(!alert);
              dell(items)
            } else {
              dispach(removeItem(item)); SetAlert(!alert);
            }


          }} className='alert_button1'>{red}</button>


          <button onClick={() => { SetAlert(!alert) }} className='alert_button2'>{blue}</button>
        </div>
      </div>
    </div>
  )
}



export const CartAlert = () => {
  return (
    <div className='cartAlert'><h3>Product added successfully</h3></div>
  )
}