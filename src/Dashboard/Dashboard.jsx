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
function Dashboard(props) {
  const { changeTheme, theme } = useContext(ThemeContext)
  const Navigate = useNavigate()
  const [goods, setGoods] = useState(true)
  const [add, setAdd] = useState(false)
  const [listed, setListed] = useState(false)
  const [sold, setSold] = useState(false)

  useEffect(() => {
    !theme && changeTheme()
  }, [])

  return (
    <div className='dashboard'>

      <div className='dashboard_head'>
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
              <div className='inventory_item '
                onClick={() => {
                  setAdd(false)
                  setGoods(true)
                  setListed(false)
                  setSold(false)
                }}
              ><p>Products</p><p>5000</p></div>
              <div className='inventory_item '
                onClick={() => {
                  setListed(true)
                  setAdd(false)
                  setGoods(false)
                  setSold(false)
                }}
              ><p >Listed</p><p>5000</p></div>
              <div className='inventory_item '
                onClick={() => {
                  setSold(true)
                  setListed(false)
                  setAdd(false)
                  setGoods(false)
                }}
              ><p>Sold</p><p>5000</p></div>
              <div className='inventory_item '><p>Processing</p><p>5000</p></div>
              <MdOutlineInsertLink fontSize={50} onClick={() => {
                setAdd(true)
                setGoods(false)
                setListed(false)
                setSold(false)
              }} />

            </div>
            <div className='dashboard_profile'>
              <img style={{ width: 50 }} src={Logo} />
              <span className='logout'><CiLogout fontSize={20} /><p>Log Out</p></span>
            </div>
          </div>

        </div>
        <div className='dashboard_body_right'>
          <div className='dashboard_body_right_head'>
            <div className='dashboard_body_right_head_wrap'>
              <h2>Inventory</h2>
              <button>Push</button>
            </div>
          </div>
          {goods && < Inventory title='Products' />}
          {listed && <Inventory title='Listed' />}
          {sold && <Inventory title="Sold" />}
          {add && <Addproduct />}
        </div>
      </div>
    </div>
  )
}
export default Dashboard