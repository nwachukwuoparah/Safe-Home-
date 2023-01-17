import React from 'react'
import './body.css'
import { Slide } from '../../Components/Slider'
import Products from '../../Components/Products'
import { TbTruckDelivery } from "react-icons/tb";
import { MdHighQuality } from "react-icons/md";
import { RiShieldKeyholeFill } from "react-icons/ri";
function Body(props) {


  return (
    <>
      <div className='route'>
        <div className='route_wrap'>
          <div className='indicator'>
            <h5>Home</h5>
          </div>
        </div>
      </div>
      <Slide />
      <Products />
      <div className='Body_Promo'>
        <div className='Body_Promo_wrap' >
          <div className="Body_Promo_text">
            < TbTruckDelivery fontSize={60} color='#FFA903' />
            <div>
              <h6>free delivery</h6>
              <p>on order above $50,000</p>
            </div>
          </div>
          <div className="Body_Promo_text">
            <MdHighQuality fontSize={60} color='#FFA903' />
            <div>
              <h6>Best quality</h6>
              <p>best quality in low price</p>
            </div>

          </div>
          <div className="Body_Promo_text">
            <RiShieldKeyholeFill fontSize={60} color='#FFA903' />
            <div>
              <h6>1 Year warranty</h6>
              <p>Avaliable warranty</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Body