import React, { useEffect, useState, useContext } from "react";
import './body.css'
import { Slide } from '../../Components/Slider'
import { Slide1 } from '../../Components/Slider'
import Products from '../../Components/PRODUCT/Products'
import Categoriesroute from "../../Components/ROUT/Categoriesroute";
import { TbTruckDelivery } from "react-icons/tb";
import { MdHighQuality } from "react-icons/md";
import { RiShieldKeyholeFill } from "react-icons/ri";
import { useDispatch } from 'react-redux'
import { AllProducts } from "../../REDUX/features";
import axios from 'axios'
import { ThemeContext } from "../../Components/ContexApi/Contex";
function Body(props) {
  const { changeTheme, display } = useContext(ThemeContext)
  const dispach = useDispatch()
  const [item, setItem] = useState([])
  async function getItem() {
    try {
      display  && changeTheme()
      const response = await axios.get('https://fakestoreapi.com/products')
      dispach(AllProducts(response.data))
      setItem(response.data)

      // console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getItem()
  }, [])



  return (
    <>
      <Categoriesroute />
      <Slide />
      <Slide1 />
      <Products item={item} title='Best Sellers' />
      <div className='Body_Promo'>
        <div className='Body_Promo_wrap' >
          <div className="Body_Promo_text">
            < TbTruckDelivery fontSize={60} color='#FFA903' />
            <div>
              <h4>free delivery</h4>
              <p>on order above $50,000</p>
            </div>
          </div>
          <div className="Body_Promo_text">
            <MdHighQuality fontSize={60} color='#FFA903' />
            <div>
              <h4>Best quality</h4>
              <p>best quality in low price</p>
            </div>

          </div>
          <div className="Body_Promo_text">
            <RiShieldKeyholeFill fontSize={60} color='#FFA903' />
            <div>
              <h4>1 Year warranty</h4>
              <p>Avaliable warranty</p>
            </div>
          </div>
        </div>
      </div>
      <Slide1 />
      <div className="Body_Call_To_Action">
        <button>
          Sign in
        </button>
        <span className="Body_Nav">New customers? <p> Start here.</p></span>
      </div>
    </>
  )
}
export default Body