import React, { useEffect, useState, useContext } from "react";
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
import { useNavigate } from "react-router-dom";

function Body(props) {
  const [loading, setLoading] = useState(false)
  const [sloading, setSLoading] = useState(false)
  const [length, setLength] = useState(false)
  const [searchresult, setSearch] = useState([])
  const navigate = useNavigate()
  const { changeTheme, display, activeuser, searchinput } = useContext(ThemeContext)
  const [item, setItem] = useState([])
  // console.log(searchinput.toLowerCase())

  function searchProducts(productsarr, query) {
    const results = [];
    for (const product of productsarr) {
      if (product.categories.toLowerCase().includes(query.toLowerCase())) {
        results.push(product);
      }
    }
    // console.log(results)
    setSearch(results);
    results.length !== 0 && setSLoading(true)
  }

  async function search() {
    console.log('result')
    try {
      const response = await axios.get('https://safehomefurniture.onrender.com/api/user')
      console.log(response)
      searchProducts(response.data.data, searchinput)
      // console.log(response.data.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    searchinput && search()
    searchresult.length === 0 ? null : setLength(true)
  }, [searchinput])


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])


  async function getItem() {
    try {
      display && changeTheme()
      const response = await axios.get('https://safehomefurniture.onrender.com/api/user')
      const result = response.data.data.filter((i) => { return i.rating > 550 })
      setItem(result)
      // console.log(result)
      result.length !== 0 && setLoading(true)
      // console.log(response.data.data)
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
      <div>
        <Slide />
        {/* <Slide1 /> */}
        <Products loading={sloading} item={searchresult} length={length} title={`${searchresult.length} items found`} />
        <Products loading={loading} item={item} length={true} title='Best Sellers' />
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
        {activeuser?.status === 201 ? null : <div className="Body_Call_To_Action">
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