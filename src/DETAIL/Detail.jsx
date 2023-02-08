import './detail.css'
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Categoriesroute from '../Components/ROUT/Categoriesroute'
import Products from '../Components/PRODUCT/Products'
import { useParams, useNavigate } from 'react-router-dom'
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineStarHalf } from "react-icons/md";
import { MdOutlineStarOutline } from "react-icons/md";
import { MdGppGood } from "react-icons/md";
import { useSelector } from 'react-redux';
import Rating from '../PAYMENT/Rating';
import Alert from "../Components/Alert/Alert"
import { useDispatch } from 'react-redux'
import { addToCart } from '../REDUX/features'
import { CartAlert } from "../Components/Alert/Alert"
import { ThemeContext } from '../Components/ContexApi/Contex';
function Detail({ }) {
  const navigate = useNavigate()
  const { changeTheme, display, cartAlert, cartA, activeuser } = useContext(ThemeContext)
  const dispach = useDispatch()
  const recent = useSelector((state) => state.Commerce.RECENT)
  const { id } = useParams()
  const [item, setItem] = useState([])
  const [item1, setItem1] = useState([])
  async function getItem() {
    display ? changeTheme() : null
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`)
      setItem(res.data)
      console.log(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  async function getItem1() {
    try {
      const res = await axios.get(`https://dummyjson.com/products/category/furniture`)
      setItem1(res.data.products)
      // console.log(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getItem()
    getItem1()
  }, [])

  return (
    <div >
      <Categoriesroute />
      {/* <Rating/> */}
      {cartAlert && <CartAlert />}
      <div className='detail'>
        <div className='detail_wrap'>
          <div className='detail_item'>
            <img src={item?.images?.[0]} />
            <div className='detail_info_wrap'>
              <h3>{item.title}</h3>
              <p>₦{item.price}</p>
              <span style={{ color: '#FFA903' }}>
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStarHalf />
                <MdOutlineStarOutline />
                <MdOutlineStarOutline />
              </span>
              <span className='detail_info' style={{ color: '#04A5FF' }}><p>Availability:</p> <MdGppGood /><p>In stock</p></span>
              <span className='detail_info'><p>Brand:</p><p>Loading...</p></span>
              <span className='detail_info' ><p>Sex:</p><p>Unisex</p></span>
              <div className='button_wrap'>
                <button className='button1 pointer' onClick={() => { git ?.email? navigate('/payment') : navigate('/signUp') }}>Buy now</button>
                <button className='button2 pointer' onClick={() => { dispach(addToCart(item)); cartA() }}  >Add to cart</button>
              </div>
            </div>
          </div>
          <div className='detail_description'>
            <div className='detail_description_head'><h3>Product details</h3></div>
            <div className='detail_description_text'>
              <p>{item.description}</p>
            </div>
          </div>
        </div>

      </div>
      {recent.length !== 0 ? <Products item={recent} title='Recently Viewed' /> : null}
      <Products item={item1} title='Related items' />
    </div >
  )
}
export default Detail