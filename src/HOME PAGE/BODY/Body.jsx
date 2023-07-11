import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import './body.css'
import { Slide } from '../../Components/Slider'
import { Slide1 } from '../../Components/Slider'
import Products from '../../Components/PRODUCT/Products'
import Categoriesroute from "../../Components/ROUT/Categoriesroute";
import { TbTruckDelivery } from "react-icons/tb";
import { MdHighQuality } from "react-icons/md";
import { RiShieldKeyholeFill } from "react-icons/ri";
import { AllProducts } from "../../REDUX/features";
import axios from 'axios'
import { ThemeContext } from "../../Components/ContexApi/Contex";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import image1 from './img1.jpg'
import image2 from './img2.jpeg'
import image3 from './img3.jpeg'
import image4 from './img4.jpeg'
import { getByRating } from "../../Components/Api/Query";
function Body(props) {
  const [loading, setLoading] = useState(false)
  const [sloading, setSLoading] = useState(false)
  const [length, setLength] = useState(false)
  const [searchresult, setSearch] = useState([])
  const navigate = useNavigate()
  const { changeTheme, display, activeuser, searchinput } = useContext(ThemeContext)
  const user = useSelector((state) => state.Commerce.user)
  const [item, setItem] = useState([])

  const { data, isLoading } = useQuery(["all_category"], getByRating, {
    refetchOnWindowFocus: false,
  });
 
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    display && changeTheme()
  }, [])

  return (
    <>
      <Categoriesroute item='HOME' />
      <div>
        <Slide />
        {/* <Products loading={sloading} item={searchresult} length={length} title={`${searchresult.length} items found`} /> */}
        <Products loading={data?.length === 0 ? !isLoading :false} item={data} length={true} title='Best Sellers' />
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
        {user[0] ? null : <div className="Body_Call_To_Action">
          <button onClick={() => { navigate('/login') }} className='pointer' >
            Login
          </button>
          <span className="Body_Nav pointer">New customers? <p onClick={() => { navigate('/signup') }}> Start here.</p></span>
        </div>}
      </div>
    </>
  )
}
export default Body   