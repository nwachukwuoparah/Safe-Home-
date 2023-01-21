import React, { useEffect, useState } from 'react'
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
import { addToCart } from '../REDUX/features';
import Swal from 'sweetalert2'
function Products({ item, title }) {
  const dispach = useDispatch()
  return (
    <div className='Products'>
      <div className='Products_wrap'>
        <div className='Products_bar'>
          <div className='Products_bar_wrap'>
            <h2>{title}</h2>
            <div className='Products_filter'>
              <MdList fontSize={55} />
              <MdOutlineApps fontSize={40} />
            </div>
          </div>
        </div>
        {item?.map((i) => (
          <div key={i.id} className='Products_Cards'>
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
              <div  onClick={() => {
              dispach(addToCart(item));
              Swal.fire({
                title: 'Added sucessfully',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              });
            }}
           className='Products_add' >
                <div className='Products_add_wrap'>
                  <p> Add to Cart</p>
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