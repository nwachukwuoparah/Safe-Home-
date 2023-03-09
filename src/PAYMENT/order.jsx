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
  const user = useSelector((state) => state.Commerce.user[0].data.data)
  console.log(addOrder)
  const { changeTheme, display } = useContext(ThemeContext)
  const [order, setOrder] = useState([])
  const navigate = useNavigate()
  const dispach = useDispatch()
  const [loading, setLoading] = useState(false)


  let count = 0
  // console.log(addOrder)
  const recusive = () => {
    setLoading(true)
    const arr = addOrder[count]?.product
    getitem(arr[count])
    console.log(arr[count].stockQuantity, arr[count].QTY)
    count++
    // console.log(count)
  }

  const getitem = async (i) => {
    try {
      const res = await axios.get(`https://safehomefurniture.onrender.com/api/get/${i?._id}`)
      const stockQuantity = res?.data?.data?.stockQuantity - i.QTY
      console.log(res?.data?.data?.stockQuantity, i.QTY)
      // const id = res?.data?.data?._id
      console.log(i._id)
      instock(i._id, stockQuantity)
      // console.log('call timer')
    } catch (e) {
      console.log(e)
    }
  }



  const instock = (Id, stoc) => {
    console.log(Id)
    console.log(stoc)
    axios.patch(`https://safehomefurniture.onrender.com/api/stock/${Id}`, { newStock: stoc })
      .then(function (res) {
        console.log(res)
        if (count !== addOrder[0]?.product?.length) {
          setTimeout(() => {
            // console.log('timer')
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
        dispach(removeOrders())
        navigate("/")
        console.log(res)
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const getOrder = async () => {
    try {
      const res = await axios.get(`https://safehomefurniture.onrender.com/api/order/${id}`)
      setOrder(res)
      if (!user) {
        navigate('/login')
        console.log("1")
      } else if (user?._id !== res?.data?.data.userId) {
        navigate('/')
        console.log("2")
      } else {
        return
      }
      !user ? (user?._id === res?.data?.data?._id ? null : navigate('/')) : null
      // console.log(user._id)
      // console.log(res?.data?.data?._id)
    } catch (e) {
      console.log(e)
    }
  }



  useEffect(() => {
    !display && changeTheme()
    getOrder()
    // console.log(user)
    // console.log(order.data.data.product)
  }, [])
  return (
    <div className='order'>
      {loading && <div className='order_wrap_loading'><div className="loader"></div> </div>}
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
