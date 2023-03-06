import React, { useContext, useEffect, useState } from 'react'
import "./order.css"
import Rating from "./Rating"
import { useNavigate } from 'react-router-dom';
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { removeOrders } from '../REDUX/features';
import { ThemeContext } from '../Components/ContexApi/Contex';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function Order(props) {
  const { id } = useParams()
  const addOrder = useSelector((state) => state.Commerce.addOrder)
  const { changeTheme, display } = useContext(ThemeContext)
  const [order, setOrder] = useState([])
  const navigate = useNavigate()
  const dispach = useDispatch()
  // console.log(addOrder.product)

  let count = 0
  const recusive = () => {
    const arr = addOrder[0]?.product
    getitem(arr[count])
    // console.log(arr[count])
    // count++
    // console.log(count)
  }
  useEffect(() => {
    // console.log(addOrder[0]._id)
  }, [])
  const getitem = async (i) => {
    try {
      const res = await axios.get(`https://safehomefurniture.onrender.com/api/get/${i?._id}`)
      const stockQuantity = res.data.data.stockQuantity - 1
      const id = res?.data?.data?._id
      // console.log(id)
      // instock(id, stockQuantity)
      // console.log('call timer')
    } catch (e) {
      console.log(e)
    }
  }



  const instock = (id, stoc) => {
    console.log(id)
    console.log(stoc)
    axios.patch(`https://safehomefurniture.onrender.com/api/stock/${id}`, { newStock: stoc })
      .then(function (res) {
        console.log(res)
        if (count !== addOrder[0]?.product?.length) {
          setTimeout(() => {
            console.log('timer')
            recusive()
          }, 2000);
        } else {
          confirmOrder()
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  const confirmOrder = () => {
    axios.post(`https://safehomefurniture.onrender.com/api/ordered/${id}`)
      .then(function (res) {
        console.log(res)
        dispach(removeOrders())
        navigate("/")
        console.log("confirm")
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  const getOrder = async () => {
    try {
      const res = await axios.get(`https://safehomefurniture.onrender.com/api/order/${id}`)
      setOrder(res)
      console.log(res)
    } catch (e) {
      console.log(e)
    }

  }



  useEffect(() => {
    !display && changeTheme()
    getOrder()
    console.log(addOrder[0]?.product)
    // console.log(order.data.data.product)
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
          {order?.data?.data?.product.map((i) => (<Rating key={i?._id} id={i?._id} title={i?.title} />))}
        </div>
        <div className='button_wrap'>
          <button className='order_button'
            onClick={() => {
              recusive()
            }}
          >confirm order</button>
        </div>
      </div>

    </div>
  )
}
