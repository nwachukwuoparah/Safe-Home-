import './detail.css'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Categoriesroute from '../Components/Categoriesroute'
import Products from '../Components/Products'
import { useParams } from 'react-router-dom'
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineStarHalf } from "react-icons/md";
import { MdOutlineStarOutline } from "react-icons/md";
import { MdGppGood } from "react-icons/md";
function Detail({ }) {
  const { id } = useParams()
  const [item, setItem] = useState([])
  const [item1, setItem1] = useState([])
  async function getItem() {

    try {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
      setItem(res.data)
      // console.log(res.data)

    } catch (e) {
      console.log(e)
    }
  }


  async function getItem1() {

    try {
      const res = await axios.get(`https://fakestoreapi.com/products?limit=5`)
      setItem1(res.data)
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
      < Categoriesroute />
      <div className='detail'>
        <div className='detail_wrap'>
          <div className='detail_item'>
            <img src={item.image} />
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
                <button className='button1'
                onClick={
                  function payKorapay() {
                    window.Korapay.initialize({
                        key: "pk_test_kXVDeYounapXU8VC1HN5u2yYqHk8xa9uu1tBaYdX",
                        reference: "your-unique-reference",
                        amount: 22000, 
                        currency: "NGN",
                        customer: {
                          name: "John Doe",
                          email: "john@doe.com"
                        },
                        notification_url: "https://example.com/webhook"
                    });
                }
                }
                >Buy now</button>
                <button className='button2'>Add to cart</button>
              </div>
            </div>
          </div>
          <div className='detail_description'>
            <div className='detail_description_head'> <h3>Product details</h3></div>
            <div className='detail_description_text'>
              <p>{item.description}</p>
            </div>
          </div>
        </div>

      </div >
      <Products  item={item1} title='Recently Viewed'/>
      <Products  item={item1} title='Related items'/>
    </div >
  )
}
export default Detail