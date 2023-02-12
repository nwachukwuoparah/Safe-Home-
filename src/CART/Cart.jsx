import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './cart.css'
import axios from "axios";
import Categoriesroute from '../Components/ROUT/Categoriesroute'
import Products from '../Components/PRODUCT/Products';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { removeItem, clearAll, Check, addToCart } from '../REDUX/features'
import Alert from '../Components/Alert/Alert'
import { ThemeContext } from '../Components/ContexApi/Contex';
import Emptycart from './Emptycart'
export default function Cart() {
  const { changeTheme, display, activeuser } = useContext(ThemeContext)
  const navigate = useNavigate()
  const [remove, setremove] = useState({})
  const [alert, setAlert] = useState(false)
  const dispach = useDispatch()
  const cart = useSelector((state) => state.Commerce.cart)
  const recent = useSelector((state) => state.Commerce.RECENT)
  const [item, setItem] = useState([])
  async function getItem() {
    display ? changeTheme() : null
    try {
      const res = await axios.get(`https://dummyjson.com/products/category/furniture`)
      setItem(res.data?.products)
      // console.log(res.data)

    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getItem()
  }, [])

  const Total = () => {
    let Total = 0;
    cart.map((i) => Total += i.total)
    return Total
  }
  return (
    <div>
      <Categoriesroute />
      <div className='cart'>
        {cart.length === 0 ? <Emptycart /> : <div className='cart_wrap'>
          <div className='cart_card_wrap'>
            <div className='cart_head'>
              <h4>Shoping Cart</h4>
              <p>Price</p>
            </div>
            {cart.map((i) => (
              <div key={i._id} className='cart_card'>
                <div className='cart_card_top'>
                  <img className='cart_image' src={i.image} />
                  <div className='cart_card_top_text'>
                    <h3>{i.title}</h3>
                    <h4>${i.price}</h4>
                  </div>
                </div>
                <div className='cart_card_middle'>
                  <button className='cart_delete pointer' onClick={() => { setAlert(true); setremove(i) }}>Delete</button>
                  <div className='cart_card_middel_navs'>
                    <button className='cart_change pointer' onClick={() => { dispach(addToCart(i)) }}>+</button>
                    <h4>{i.QTY}</h4>
                    <button className='cart_change pointer' onClick={() => { dispach(Check(i)) }}>-</button>
                  </div>ß
                </div>
              </div>
            ))}
            <div className='cart_card_buttom'>
              <button className='cart_checkout pointer' onClick={() => { activeuser?.status === 201 ? navigate('/payment') : navigate('/signUp') }}>Checkout</button>
              <h4>Total:{Total()}</h4>
            </div>
          </div>
          {alert ? <Alßert red="Delete" blue="Cancle" alert={alert} SetAlert={setAlert} dispach={dispach} removeItem={removeItem} item={remove} /> : null}
        </div>}
      </div>
      <Products item={item} title='Related items' />
    </div>
  )
}