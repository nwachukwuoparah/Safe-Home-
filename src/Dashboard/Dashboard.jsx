import React, { useEffect, useContext, useState } from 'react'
import './dashboard.css'
import { HiHome } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { ThemeContext } from '../Components/ContexApi/Contex';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import Logo from './Union.svg'
import Inventory from './Inventory/Inventory';
import Addproduct from './addProducts/Addproduct';
import { MdOutlineInsertLink } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
function Dashboard(props) {
  const [search, setSearch] = useState(false)
  const [menu, setMenu] = useState(false)
  const addProduct = useSelector((state) => state.Commerce.addProduct)
  const [productitem, setProductitem] = useState((localStorage.getItem('Product')))
  const { changeTheme, display } = useContext(ThemeContext)
  const Navigate = useNavigate()

  const [listed, setListed] = useState(false)
  const [sold, setSold] = useState(false)

  useEffect(() => {
    !display && changeTheme()
  }, [])
  useEffect(() => {
    console.log(listed)
  }, [listed])
  const mobileSide = (
    <div onClick={() => setMenu(false)} className='mobile_dashboard_body_left_cont '>
      <div className='mobile_dashboard_body_left'>
        <div className='mobile_dashboard_body_left_wrap'>
          <img style={{ width: 150 }} src={Logo} />
          <div className='mobile_inventory'>
            <h5>inventory</h5>
            <div className='mobile_inventory_item ' onClick={() => { Navigate('/dashboard'); setListed(false) ; setSold(false) }}><p>Products</p><p>5000</p></div>
            <div className='mobile_inventory_item' onClick={() => { Navigate('/dashboard/listed'); setListed(true); setSold(false) }}><p >Listed</p><p>{addProduct.length}</p></div>
            <div className='mobile_inventory_item' onClick={() => { Navigate('/dashboard/sold') ;setListed(false) ;setSold(true) }}><p>Sold</p><p>5000</p></div>
            <div className='mobile_inventory_item'><p>Processing</p><p>5000</p></div>
            <MdOutlineInsertLink onClick={() => { Navigate('/dashboard/addProduct') ;setListed(false) ; setSold(false) }} fontSize={50} />

          </div>
          <div className='mobile_dashboard_profile'>
            <img style={{ width: 50 }} src={Logo} />
            <span className='mobile_logout'><CiLogout fontSize={20} /><p>Log Out</p></span>
          </div>
        </div>
      </div>
    </div>

  )


  return (
    <div className='dashboard'>
      <div className='dashboard_head'>

        <div className='dashboard_head_wrap_mobile'>
          <FiMenu onClick={() => setMenu(!menu)} fontSize={25} />
          {menu && mobileSide}
          {search ? <div className='dashboard_input'>
            <input />
            <BsSearch onClick={() => setSearch(!search)} className='pointer' fontSize={15} />
          </div> :
            <div className='dashboard_head_wrap_mobile_nav'>
              <div></div>
              <BsSearch onClick={() => setSearch(!search)} className='pointer' fontSize={17} />
            </div>}

          <HiHome onClick={() => { Navigate('/') }} fontSize={30} color='#003F62' />
        </div>

        <div className='dashboard_head_wrap'>
          <h2>Dashboard</h2>
          <div className='dashboard_input'>
            <input />
            <BsSearch />
          </div>
          <HiHome onClick={() => { Navigate('/') }} fontSize={40} color='#003F62' />
        </div>
      </div>

      <div className='dashboard_body'>
        <div className='dashboard_body_left'>
          <div className='dashboard_body_left_wrap'>
            <img style={{ width: 150 }} src={Logo} />
            <div className='inventory'>
              <h5>inventory</h5>
              <div className='inventory_item ' onClick={() => { Navigate('/dashboard') ;setListed(false) ; setSold(false) }}><p>Products</p><p>5000</p></div>
              <div className='inventory_item ' onClick={() => { Navigate('/dashboard/listed');setListed(true) ; setSold(false) }} ><p >Listed</p><p>{addProduct.length}</p></div>
              <div className='inventory_item ' onClick={() => { Navigate('/dashboard/sold'); setListed(false); setSold(true)  }}><p>Sold</p><p>5000</p></div>
              <div className='inventory_item '><p>Processing</p><p>5000</p></div>
              <MdOutlineInsertLink fontSize={50} onClick={() => { Navigate('/dashboard/addProduct') ; setSold(false) }} />
            </div>
            <div className='dashboard_profile'>
              <img style={{ width: 50 }} src={Logo} />
              <span className='logout'><CiLogout fontSize={20} /><p>Log Out</p></span>
            </div>
          </div>
        </div>

        <div onClick={() => setSearch(false)} className='dashboard_body_right'>
          <div className='dashboard_body_right_head'>
            <div className='dashboard_body_right_head_wrap'>
              <h2>Inventory</h2>
              {listed && <button>Push</button>}
            </div>
          </div>
          <Routes>
            <Route path={'/'} element={< Inventory subtitle='Products' title="Total products:" amount="50,000" />} />
            <Route path={'listed'} element={<Inventory addProduct={addProduct} Product="product" subtitle='Listed' title="Total listed products:" amount={addProduct.length} />} />
            <Route path={'/sold'} element={<Inventory subtitle="Sold" title="Account Balance:" title="Recently Sold Item" amount="50,000" sold={sold} />} />
            <Route path={'/addProduct'} element={<Addproduct />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
export default Dashboard

