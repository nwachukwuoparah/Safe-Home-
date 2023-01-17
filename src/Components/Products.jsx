import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './products.css'
import { MdOutlineApps } from "react-icons/md";
import { MdList } from "react-icons/md";
import { MdStar } from "react-icons/md";
import { MdStarHalf } from "react-icons/md";
import { MdStarOutline } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi";

function Products(props) {
  const [item, setItem] = useState([])
  const [toggle, setToggle] = useState(false)
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

  return (
    <div className='Products'>
      <div className='Products_wrap'>
        <div className='Products_bar'>
          <div className='Products_bar_wrap'>
            <h2>Best Sellers</h2>
            <div className='Products_filter'>
              <MdList fontSize={55} />
              <MdOutlineApps fontSize={40} />
            </div>
          </div>
        </div>
        {item.map((i) => (
          <div className='Products_Cards'
            onMouseEnter={() => { setToggle(true) }}
            onMouseLeave={() => { setToggle(false) }}
          >
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
              {console.log(toggle)}
              <div  className ='Products_add' >
                <div className='Products_add_wrap'>
                  <p> Add to Cart</p>
                  <HiOutlineShoppingCart />
                </div>
              </div>


            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
export default Products