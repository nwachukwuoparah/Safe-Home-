import React, { useState } from 'react'
import { RxDotFilled } from "react-icons/rx";
import { RxDotsHorizontal } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
export function Product(props) {
  const [action, setAction] = useState(false)
  const navigate = useNavigate()
  return (
    <div className='Links_cont'>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 30 }}>
        <div className='Links'>
          <div className='Paymentlink_head_buttom_left'>
            <p>{props.title}</p>
            <p>One-time</p>
          </div>
          <div className='Paymentlink_head_buttom_left'>
            <div>
              <p>{props.price}</p>
              <p className='Paymentlink_head_buttom_left_P1'>Fixed</p>
            </div>
            <div style={{
              backgroundColor: props.stockQuantity === 0 ? '#ff000033' : null,
              color: props.stockQuantity === 0 ? 'red' : null
            }} className='activ'>
              <RxDotFilled />
              {props.stockQuantity === 0 ? <p>out of stock</p> : <p>In stock</p>}
            </div>
          </div>
        </div>
        <RxDotsHorizontal className='inventory_select' fontSize={25} onClick={() => { setAction(!action) }} />
      </div>
      {action && <div className='Links_navs_mobile'>
        <p onClick={() => { props.setAlert(true); props.setremove(props) }} >Delete</p>
        <p onClick={() => { navigate(`/dashboard/update/${props._id}`) }} >Manage</p>
      </div>}

      <div className='Links_navs'>
        <p onClick={() => { props.setAlert(true); props.setremove(props) }} >Delete</p>
        <p onClick={() => { navigate(`/dashboard/update/${props._id}`) }} >Manage</p>
      </div>

    </div>
  )
}
