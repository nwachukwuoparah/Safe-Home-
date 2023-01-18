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

function Products({ item,title }) {

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
          <Link key={i.id} className='Products_Cards' to={`/detail/${i.id}`}>
            <div className='Products_Cards_wrap'>
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
              <div className='Products_add' >
                <div className='Products_add_wrap'>
                  <p> Add to Cart</p>
                  <HiOutlineShoppingCart />
                </div>
              </div>


            </div>

          </Link>
        ))}
      </div>
    </div>
  )
}
export default Products