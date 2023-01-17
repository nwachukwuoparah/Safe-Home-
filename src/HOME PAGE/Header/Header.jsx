import React from 'react'
import './header.css'
import Logo from './logo.png'
import { TbUserCircle } from "react-icons/tb";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
function Header() {

  return (
    <header className='header'>
      <div className='header1'>
        <div className='header1_wrap'>
          <nav className='hi_2' >
            <img style={{ width: 70 }} src={Logo} />
            <div className='input'>
              <input />
              <BsSearch />
            </div>
          </nav>

          <nav className='hl_2'>
            <TbUserCircle fontSize={30} />
            <p>Login</p>
            <p>Sign up</p>
            <span style={{ display: 'flex' }}>
              <p>Cart</p>
              <HiOutlineShoppingCart />
            </span>
          </nav>

        </div>
      </div>

      <div className='header2'>
        <div className='header2_wrap'>
          <div className='catigories'>
            <FiMenu fontSize={30} />
            <p>All category</p>
          </div>
          <h2 style={{ color: '#003F62' }}>30 Days Free return</h2>
        </div>
      </div>
    </header>
  )
}
export default Header