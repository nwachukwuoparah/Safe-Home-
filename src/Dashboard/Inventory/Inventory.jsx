import './inventory.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Alert from '../../Components/Alert/Alert';
import axios from 'axios';
import { Product } from './Product';
export default function Inventory({ product, buttonC }) {
  const [remove, setremove] = useState({})
  const [alert, setAlert] = useState(false)
  const user = useSelector((state) => state.Commerce.user)
  const [button, setButton] = useState(true)
  const [nav, setNav] = useState(false)
const navigate =useNavigate()
  //  {console.log(product)}


  const Delete = async (i) => {
    // console.log(i)
    // console.log(user?.[0].data.data._id, i._id)
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
              <p>You have generated {product?.length} Products</p>
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
          {product?.map((i) => (i.brandName === user[0]?.brandname ? (<Product {...i} setremove={setremove} alert={alert} setAlert={setAlert} />) : null
          ))}
          {alert ? <Alert red="Delete" blue="Cancle" alert={alert} SetAlert={setAlert} dell={Delete} items={remove} /> : null}
        </div>
      </div>
    </div>
  )
}
