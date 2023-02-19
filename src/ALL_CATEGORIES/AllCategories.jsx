import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import './allcategories.css'
import Products from '../Components/PRODUCT/Products'
import Categoriesroute from '../Components/ROUT/Categoriesroute';
import { TbTruckDelivery } from "react-icons/tb";
import { useDispatch } from 'react-redux'
import { AllProducts } from "../REDUX/features";
import { MdHighQuality } from "react-icons/md";
import { RiShieldKeyholeFill } from "react-icons/ri";
import { ThemeContext } from "../Components/ContexApi/Contex";
function AllCategories({ }) {
  const [loading, setLoading] = useState(false)
  const { changeTheme, display, activeuser } = useContext(ThemeContext)
  const [item, setItem] = useState([])
  const dispach = useDispatch()

  async function getItem() {
    try {
      const response = await axios.get('https://safehomefurniture.onrender.com/api/user')
      setItem(response.data.data)
      dispach(AllProducts(response.data.data))
      setLoading(true)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getItem()
  }, [])

  useEffect(() => {
    console.log(item)
  }, [item])

  useEffect(() => {
    display && changeTheme()
  }, [])

  return (
    <div>
      <Categoriesroute />
      < Products loading={loading} item={item} title='All category' />
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
