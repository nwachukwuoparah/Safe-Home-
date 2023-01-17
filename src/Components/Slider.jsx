import './slider.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios'
import React, { useEffect, useState } from "react";
export function Slide({ }) {
  const [item, setItem] = useState([])

  const slide = {
    // width: slide_width
  }

  async function getItem() {
    try {
      const response = await axios.get('https://fakestoreapi.com/products')
      setItem(response.data)
      // console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getItem()
  }, [])

  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 2000,
    arrows: false
  };
  return (
    <div className='slid_contain'>
      <Slider style={slide} className='Slider' {...settings}>
        {item?.map((item) => (
          <div key={item.id} className='slider_wrap'>
            <img className='image' key={item.id} src={item.image} />
          </div>))}
      </Slider>
    </div>
  )
}

export function Slide1({ }) {
  const [item, setItem] = useState([])

  const slide = {
    // width: slide_width
  }

  async function getItem() {
    try {
      const response = await axios.get('https://fakestoreapi.com/products')
      setItem(response.data)
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getItem()
  }, [])

  const settings = {
    className: 'div',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerpadding: '100px'
  };
  return (
    <div className='slid_contain1'>
      <Slider style={slide} className='Slider1' {...settings}>
        {item?.map((item) => (
          <div key={item.id} className='wrap1'>
            <div className='wrap2' >
              <img className='image1' key={item.id} src={item.image} />
              <div style={{ backgroundColor: 'white', width: 100 }}>
                <h3>Food</h3>
                <p>Food</p>
              </div>
            </div>
          </div>))}
      </Slider>
    </div>
  )
}