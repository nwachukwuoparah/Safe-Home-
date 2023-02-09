import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import './products.css'
import { MdOutlineApps } from "react-icons/md";
import { MdList } from "react-icons/md";
import { MdStar } from "react-icons/md";
import { MdStarHalf } from "react-icons/md";
import { MdStarOutline } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { addToCart } from '../../REDUX/features';
import { recent } from '../../REDUX/features'
import { ThemeContext } from '../ContexApi/Contex';
function Products({ item, title}) {
  const [toggle, setToggle] = useState(false)
  const { cartAlert, cartA } = useContext(ThemeContext)
  const dispach = useDispatch()
  return (
    <div className='Products'>
      {cartAlert && <div className='cartAlert'><h3>Product added successfully</h3></div>}
      <div className='Products_wrap'>
        <div className='Products_bar'>
          <div className='Products_bar_wrap'>
            <h2>{title}</h2>
            <div className='Products_filter'>
              <MdOutlineApps onClick={() => { setToggle(false) }} fontSize={22.5} />
              <MdList onClick={() => { setToggle(true) }} fontSize={30} />
            </div>
          </div>
        </div>

        {item?.map((i) => (
          <div onClick={() => { dispach(recent(i)) }} key={i.id} className={toggle ? 'TOGGLEProducts_Cards pointer' : 'Products_Cards pointer'}>
            <div className={toggle ? 'TOGGLEProducts_Cards_wrap1' : 'Products_Cards_wrap'}>
              <Link className={toggle ? 'TOGGLEProducts_Cards_wrap' : 'Products_Cards_wrap'} to={`/detail/${i.id}`}>
                <img src={i?.images[0]} />
                <div className={toggle ? 'TOGGLEProducts_text' : 'Products_text'}>
                  <p>{i.title}</p>
                  <p>₦{i.price}</p>
                  <div className={toggle ? 'TOGGLEProducts_Rating' : 'Products_Rating'}>
                    <MdStar />
                    <MdStar />
                    <MdStar />
                    <MdStarHalf />
                    <MdStarOutline />
                  </div>
                </div>
              </Link>
              <div onClick={() => { dispach(addToCart(i)); cartA(); }} className={toggle?'TOGGLEProducts_add':'Products_add'} >
                <div className={toggle?'TOGGLEProducts_add_wrap':'Products_add_wrap'}>
                  <p className='pointer' > Add to Cart</p>
                  <HiOutlineShoppingCart />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div >
  )
}
export default Products