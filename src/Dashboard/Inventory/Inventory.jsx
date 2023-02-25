import './inventory.css'
import React from 'react'
import { RxDotFilled } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';


export default function Inventory({ product }) {
  const navigate = useNavigate()

  //  {console.log(product)}

  return (
    <div className='Paymentlink'>
      <div className='Paymentlink_wrap'>
        <div className='Paymentlink_head'>
          <div className='Paymentlink_head_top'>

            <div className='title'>
              <h1>Products Links</h1>
              <p>You have generated 5 payment links</p>
            </div>
            <button onClick={() => { navigate('/dashboard/addproduct') }}  >Create new product</button>
          </div>

          <div className='Paymentlink_head_buttom'>
            <div className='Paymentlink_head_buttom_left'>
              <p>Link Title</p>
              <p className='Paymentlink_head_buttom_left_P'>Type</p>
            </div>


            <div className='Paymentlink_head_buttom_left'>
              <p>Amount</p>
              <p className='Paymentlink_head_buttom_left_P'>Status</p>
            </div>
          </div>
        </div>
        
        <div className='Links_cont_wrap'>
          {product?.map((i) => (
            <div className='Links_cont'>
              <div className='Links'>
                <div className='Paymentlink_head_buttom_left'>
                  <p>Three sitter</p>
                  <p>One-time</p>
                </div>
                <div className='Paymentlink_head_buttom_left'>
                  <div>
                    <p>KES 30,405.02</p>
                    <p className='Paymentlink_head_buttom_left_P1'>Fixed</p>
                  </div>
                  <div className='activ'>
                    <RxDotFilled color={'green'} />
                    <p>In stock</p>
                  </div>
                </div>
              </div>
              <div className='Links_navs'>
                <p style={{ color: '#7139CD' }} >Preview product</p>
                <p>Delete</p>
                <p>Manage</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
