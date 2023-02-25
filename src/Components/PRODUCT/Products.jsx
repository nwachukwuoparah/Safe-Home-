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
function Products({ item, title, loading, length }) {
  const [toggle, setToggle] = useState(false)
  const { cartAlert, cartA } = useContext(ThemeContext)
  const dispach = useDispatch()
  const Outline = (
    <div className={toggle ? 'TOGGLEProducts_Rating' : 'Products_Rating'}>
      <MdStarOutline />
      <MdStarOutline />
      <MdStarOutline />
      <MdStarOutline />
      <MdStarOutline />
    </div>
  )
  const halfStar = (
    <div className={toggle ? 'TOGGLEProducts_Rating' : 'Products_Rating'}>
      <MdStarHalf />
      <MdStarOutline />
      <MdStarOutline />
      <MdStarOutline />
      <MdStarOutline />
    </div>
  )
  const one_Star = (
    <div className={toggle ? 'TOGGLEProducts_Rating' : 'Products_Rating'}>
      <MdStar />
      <MdStarOutline />
      <MdStarOutline />
      <MdStarOutline />
      <MdStarOutline />
    </div>
  )
  const one_half = (
    <div className={toggle ? 'TOGGLEProducts_Rating' : 'Products_Rating'}>
      <MdStar />
      <MdStarHalf />
      <MdStarOutline />
      <MdStarOutline />
      <MdStarOutline />
    </div>
  )
  const two_star = (
    <div className={toggle ? 'TOGGLEProducts_Rating' : 'Products_Rating'}>
      <MdStar />
      <MdStar />
      <MdStarOutline />
      <MdStarOutline />
      <MdStarOutline />
    </div>
  )
  const two_half = (
    <div className={toggle ? 'TOGGLEProducts_Rating' : 'Products_Rating'}>
      <MdStar />
      <MdStar />
      <MdStarHalf />
      <MdStarOutline />
      <MdStarOutline />
    </div>
  )
  const three_star = (
    <div className={toggle ? 'TOGGLEProducts_Rating' : 'Products_Rating'}>
      <MdStar />
      <MdStar />
      <MdStar />
      <MdStarOutline />
      <MdStarOutline />
    </div>
  )
  const three_half = (
    <div className={toggle ? 'TOGGLEProducts_Rating' : 'Products_Rating'}>
      <MdStar />
      <MdStar />
      <MdStar />
      <MdStarHalf />
      <MdStarOutline />
    </div>
  )
  const four_star = (
    <div className={toggle ? 'TOGGLEProducts_Rating' : 'Products_Rating'}>
      <MdStar />
      <MdStar />
      <MdStar />
      <MdStar />
      <MdStarOutline />
    </div>
  )
  const four_half = (
    <div className={toggle ? 'TOGGLEProducts_Rating' : 'Products_Rating'}>
      <MdStar />
      <MdStar />
      <MdStar />
      <MdStar />
      <MdStarHalf />
    </div>
  )
  const five_Star = (
    <div className={toggle ? 'TOGGLEProducts_Rating' : 'Products_Rating'}>
      <MdStar />
      <MdStar />
      <MdStar />
      <MdStar />
      <MdStar />
    </div>
  )

  return (
    <div className='Products'>
      {cartAlert && <div className='cartAlert'><h3>Product added successfully</h3></div>}
      {length && <div className='Products_wrap'>
        <div className='Products_bar'>
          <div className='Products_bar_wrap'>
            <h2>{title}</h2>
            <div className='Products_filter'>
              <MdOutlineApps onClick={() => { setToggle(false) }} fontSize={22.5} />
              <MdList onClick={() => { setToggle(true) }} fontSize={30} />
            </div>
          </div>
        </div>
        {loading ? <>
          {item?.map((i) => (
            <div onClick={() => { dispach(recent(i)) }} key={i._id} className={toggle ? 'TOGGLEProducts_Cards pointer' : 'Products_Cards pointer'}>
              <div className={toggle ? 'TOGGLEProducts_Cards_wrap1' : 'Products_Cards_wrap'}>
                <Link className={toggle ? 'TOGGLEProducts_Cards_wrap' : 'Products_Cards_wrap'} to={`/detail/${i._id}`}>
                  <img src={i?.image} />
                  <div className={toggle ? 'TOGGLEProducts_text' : 'Products_text'}>
                    <p>{i.title}</p>
                    <p>₦{i.price}</p>
                    {i.rating > 1000 && five_Star}
                    {i.rating > 850 && i.rating <= 1000 && four_half}
                    {i.rating > 750 && i.rating <= 850 && four_star}
                    {i.rating > 650 && i.rating <= 750 && three_half}
                    {i.rating > 550 && i.rating <= 650 && three_star}
                    {i.rating > 450 && i.rating <= 550 && two_half}
                    {i.rating > 350 && i.rating <= 450 && two_star}
                    {i.rating > 250 && i.rating <= 350 && one_half}
                    {i.rating > 150 && i.rating <= 250 && one_Star}
                    {i.rating > 50 && i.rating <= 150 && halfStar}
                    {i.rating < 50 && Outline}

                  </div>
                </Link>
                <div onClick={() => { dispach(addToCart(i)); cartA(); }} className={toggle ? 'TOGGLEProducts_add' : 'Products_add'} >
                  <div className={toggle ? 'TOGGLEProducts_add_wrap' : 'Products_add_wrap'}>
                    <p className='pointer' > Add to Cart</p>
                    <HiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </> :
          <>
            {[1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((index) => (
              <div key={index} className="card">
                <div className="Lheader">
                  <div className="img"></div>
                </div>
                <div className="description">
                  <div className="line line-1"></div>
                  <div className="line line-2"></div>
                  <div className="line line-3"></div>
                </div>
                <div className="btns">
                  <div className="btn btn-1"></div>
                </div>
              </div>
            ))}
          </>}
      </div>}
    </div>
  )
}
export default Products