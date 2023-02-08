import React, { useEffect, useState } from "react";
import axios from "axios";
import './allcategories.css'
import Products from '../Components/PRODUCT/Products'
import Categoriesroute from '../Components/ROUT/Categoriesroute';
import { TbTruckDelivery } from "react-icons/tb";
import { MdHighQuality } from "react-icons/md";
import { RiShieldKeyholeFill } from "react-icons/ri";
function AllCategories({}) {

  const [item, setItem] = useState([])
  async function getItem() {
    try {
      const response = await axios.get('https://dummyjson.com/products/category/furniture')
      setItem(response.data.products)
      // console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getItem()
  }, [])


  return (
    <div>
      <Categoriesroute/>
      < Products item={item} title='All category'/>
      <div className='categories_Promo'>
        <div className='categories_Promo_wrap' >
          <div className="categories_Promo_text">
            < TbTruckDelivery fontSize={60} color='#FFA903' />
            <div>
              <h4>free delivery</h4>
              <p>on order above $50,000</p>
            </div>
          </div>
          <div className="categories_Promo_text">
            <MdHighQuality fontSize={60} color='#FFA903' />
            <div>
              <h4>Best quality</h4>
              <p>best quality in low price</p>
            </div>

          </div>
          <div className="categories_Promo_text">
            <RiShieldKeyholeFill fontSize={60} color='#FFA903' />
            <div>
              <h4>1 Year warranty</h4>
              <p>Avaliable warranty</p>
            </div>
          </div>
        </div>
      </div>
      <div className="categories_Call_To_Action">
        <button>
          Sign in
        </button>
        <span className="categories_Nav">New customers? <p> Start here.</p></span>
      </div>
    </div>
  )
}


export default AllCategories
