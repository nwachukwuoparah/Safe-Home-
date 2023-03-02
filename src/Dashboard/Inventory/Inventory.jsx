import './inventory.css'
import React, { useState, useEffect } from 'react'
import { RxDotFilled } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Alert from '../../Components/Alert/Alert';
import axios from 'axios';

export default function Inventory({ product, buttonC }) {
  const [remove, setremove] = useState({})
  const [alert, setAlert] = useState(false)
  const user = useSelector((state) => state.Commerce.user)
  const navigate = useNavigate()
  const [button, setButton] = useState(true)

  //  {console.log(product)}




  const Delete = async (i) => {
    console.log(user?.[0].data.data._id, i._id)
    try {
      const res = await axios.delete(`https://safehomefurniture.onrender.com/api/admin/${user?.[0].data.data._id}/${i._id}`)
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }




  useEffect(() => {
    setButton(buttonC)
  }, [buttonC])
  return (
    <div className='Paymentlink'>
      <div className='Paymentlink_wrap'>
        <div className='Paymentlink_head'>
          <div className='Paymentlink_head_top'>

            <div className='title'>
              <h1>Products Links</h1>
              <p>You have generated {product.length} Products</p>
            </div>
            {button && <button onClick={() => { navigate('/dashboard/addproduct') }} >Create new product</button>}
          </div>

          <div className='Paymentlink_head_buttom'>
            <div className='Paymentlink_head_buttom_left'>
              <p> Title</p>
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
            i.brandName === user[0]?.data.data.brandname ? (<div className='Links_cont'>
              <div className='Links'>
                <div className='Paymentlink_head_buttom_left'>
                  <p>{i.title}</p>
                  <p>One-time</p>
                </div>
                <div className='Paymentlink_head_buttom_left'>
                  <div>
                    <p>{i.price}</p>
                    <p className='Paymentlink_head_buttom_left_P1'>Fixed</p>
                  </div>
                  <div style={{
                    backgroundColor: i.stockQuantity === 0 ? '#ff000033' : null,
                    color: i.stockQuantity === 0 ? 'red' : null
                  }} className='activ'>
                    <RxDotFilled />
                    {i.stockQuantity === 0 ? <p>out of stock</p> : <p>In stock</p>
                    }
                  </div>
                </div>
              </div>
              <div className='Links_navs'>
                <p style={{ color: '#7139CD' }} >Preview product</p>
                <p onClick={() => { setAlert(true); setremove(i) }} >Delete</p>
                <p onClick={() => { navigate(`/dashboard/update/${i._id}`) }} >Manage</p>
              </div>
            </div>) : null
          ))}
          {alert ? <Alert red="Delete" blue="Cancle" alert={alert} SetAlert={setAlert} dell={Delete} items={remove} /> : null}
        </div>
      </div>
    </div>
  )
}
