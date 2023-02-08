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
      const response = await axios.get(`https://dummyjson.com/products/category/furniture`)
      setItem(response.data.products)
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
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className='slid_contain'>
      <Slider style={slide} className='Slider' {...settings}>
        {item?.map((item) => (
          <div key={item.id} className='slider_wrap'>
            <img className='image' key={item.id} src={item.images[2]} />
          </div>))}
      </Slider>
    </div>
  )
}



// ###################################
export function Slide1({ auto, arrows }) {
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
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className='slid_contain1'>
      <Slider style={slide} className='Slider1' {...settings}>
        {item?.map((item) => (
          <div key={item.id} className='slider_wrap1'>
            <div className='Card'>
              <div className='card_title'>
                <img className='image1' key={item.id} src={item.image} />
                <p>{item.category}</p>
              </div>
              <p className='card_P'>{item.title}</p>
            </div>

          </div>))}
      </Slider>
    </div>
  )
}