import React, { useContext, useEffect } from 'react'
import './header.css'
import Logo from './Union.svg'
import { TbUserCircle } from "react-icons/tb";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../Components/ContexApi/Contex'
import { useSelector } from 'react-redux';
function Header() {
  const cart = useSelector((state) => state.Commerce.cart)
  const Navigate = useNavigate()
  const { changeTheme, notice } = useContext(ThemeContext)
  const quantity = () => {
    let QTY = 0;
    cart.map((i) => QTY += i.QTY)
    return QTY
  }
  return (
    <header className='header'>
      <div className='header1'>
        <div className='header1_wrap'>
          <nav className='hi_2' >
            <img onClick={() => Navigate('/')} style={{ width: 70 }} src={Logo} />
            <div className='input'>
              <input />
              <BsSearch />
            </div>
          </nav>

          <nav className='hl_2'>
            <TbUserCircle onClick={() => { Navigate('/dashboard') }} fontSize={30} />
            <p onClick={() => { Navigate('/login'); }} >Login</p>
            <p onClick={() => { Navigate('/signup');}} >Sign up</p>
            <span style={{ display: 'flex' }}>
              <p onClick={() => Navigate('/cart')}>Cart</p>
              <HiOutlineShoppingCart />{cart.length !== 0 ? <sup>{quantity()}</sup> : null}
            </span>
          </nav>

        </div>
      </div>

      <div className='header2'>
        <div className='header2_wrap'>
          <div onClick={() => Navigate('/Catogories')} className='catigories'>
            <FiMenu fontSize={30} />
            <p>All category</p>
          </div>
          {notice ? <h3>Added</h3> : null}
          <h2 style={{ color: '#003F62' }}>30 Days Free return</h2>
        </div>
      </div>
    </header >
  )
}
export default Header