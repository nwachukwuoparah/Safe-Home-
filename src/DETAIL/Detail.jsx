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
import Alert from "../Components/Alert/Alert"
import { useDispatch } from 'react-redux'
import { addToCart } from '../REDUX/features'
import { CartAlert } from "../Components/Alert/Alert"
import { ThemeContext } from '../Components/ContexApi/Contex';
function Detail({ }) {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { changeTheme, display, cartAlert, cartA, activeuser } = useContext(ThemeContext)
  const user = useSelector((state) => state.Commerce.user)
  const dispach = useDispatch()
  const recent = useSelector((state) => state.Commerce.RECENT)
  const {id, categories } = useParams()
  //  console.log(id)
  const [item, setItem] = useState([])
  const [item1, setItem1] = useState([])
  async function getItem() {
    display ? changeTheme() : null
    try {
      const res = await axios.get(`https://safehomefurniture.onrender.com/api/get/${id}`)
      setItem(res.data.data)
      console.log(res.data.data)
    } catch (e) {
      console.log(e)
    }
  }
  async function getItem1() {
    try {
      const res = await axios.get(`https://safehomefurniture.onrender.com/api/user`)
      setItem1(res.data.data)
      setLoading(true)
      // console.log(res.data.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getItem()
    getItem1()
  }, [id])
  // console.log(activeuser?.status)
  return (
    <div >
      <Categoriesroute />
      {cartAlert && <CartAlert />}
      <div className='detail'>
        <div className='detail_wrap'>
          <div className='detail_item'>
            <img src={item?.image} />
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
                <button className='button1 pointer' onClick={() => { user?.[0]?.status === 201 ? navigate('/payment') : navigate('/signUp') }}>Buy now</button>
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
      {recent.length !== 0 ? <Products length={true} item={recent} loading={loading} title='Recently Viewed' /> : null}
      <Products length={true} loading={loading} item={item1} title='Related items' />
    </div>
  )
}
export default Detail
