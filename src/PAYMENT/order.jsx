import React, { useContext, useEffect, useState } from 'react'
import "./order.css"
import Rating from "./Rating"
import { useNavigate } from 'react-router-dom';
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { removeOrders } from '../REDUX/features';
import { ThemeContext } from '../Components/ContexApi/Contex';
import axios from 'axios';
export default function Order(props) {
  const addOrder = useSelector((state) => state.Commerce.addOrder)
  const { changeTheme, display } = useContext(ThemeContext)
  const navigate = useNavigate()
  const dispach = useDispatch()
  console.log(addOrder.product)
  let count = 0
  const recusive = () => {
    const arr = addOrder.product
    getitem(arr[count])
    count++
    console.log(count)
  }

  const getitem = async (i) => {
    console.log("i")
    try {
      const res = await axios.get(`https://safehomefurniture.onrender.com/api/get/${i._id}`)
      const stockQuantity = Number(res.data.data.stockQuantity) - 1
      const id = res.data.data._id
      // console.log(stockQuantity)
      // console.log(stockQuantity)
      instock(id, stockQuantity)
    } catch (e) {
      console.log(e)
    }
  }


  const instock = (id, stoc) => {
    console.log(id)
    console.log(stoc)
    axios.post(`https://safehomefurniture.onrender.com/api/stock/${id}`, { stock: stoc })
      .then(function (res) {
        console.log(res)
        dispach(removeOrders())
        navigate("/")
        console.log(res)
        if (count !== addOrder.product.length) {
          setTimeout(() => {
            recusive()
          }, 2000);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }




  const confirmOrder = () => {
    axios.post(`https://safehomefurniture.onrender.com/api/ordered/${addOrder._id}`)
      .then(function (res) {
        console.log(res)
        dispach(removeOrders())
        navigate("/")
      })
      .catch(function (error) {
        console.log(error);
      });
  }




  useEffect(() => {
    !display && changeTheme()
  }, [])
  return (
    <div className='order'>
      <div className='order_wrap'>
        <div className='ordet_title'>
          <div className='ordet_title_wrap'>
            <p>item</p>
            <p>rating</p>
          </div>
        </div>
        <div className='order_item_wrap'>
          {addOrder.product?.map((i) => (<Rating key={i._id} id={i._id} title={i.title} />))}
        </div>
        <div className='button_wrap'>
          <button className='order_button'
            onClick={() => {
              confirmOrder()
              // recusive()
            }}
          >confirm order</button>
        </div>
      </div>

    </div>
  )
}
