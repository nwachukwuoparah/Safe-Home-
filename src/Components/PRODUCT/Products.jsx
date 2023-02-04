import React, { useEffect, useState,useContext } from 'react'
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
function Products({ item, title }) {
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
              <MdList fontSize={30} />
              <MdOutlineApps fontSize={22.5} />
            </div>
          </div>
        </div>

        {item?.map((i) => (
          <div onClick={() => { dispach(recent(i)) }} key={i.id} className='Products_Cards pointer'>
            <div className='Products_Cards_wrap'>
              <Link className='Products_Cards_wrap' to={`/detail/${i.id}`}>
                <img src={i.image} />
                <div className='Products_text'>
                  <p>{i.title}</p>
                  <p>₦{i.price}</p>
                  <div className='Products_Rating'>
                    <MdStar />
                    <MdStar />
                    <MdStar />
                    <MdStarHalf />
                    <MdStarOutline />
                  </div>
                </div>
              </Link>
              <div onClick={() => { dispach(addToCart(i)); cartA(); }} className='Products_add' >
                <div className='Products_add_wrap'>
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