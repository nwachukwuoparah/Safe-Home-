import React,{ useContext, useEffect } from 'react'
import './header.css'
import Logo from './logo.png'
import { TbUserCircle } from "react-icons/tb";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../Components/ContexApi/Contex'
function Header() {
  const Navigate = useNavigate()
  const { changeTheme } = useContext(ThemeContext)
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
            <TbUserCircle fontSize={30} />
            <p onClick={()=>{ Navigate('/login');  changeTheme(); }} >Login</p>
            <p onClick={()=>{ Navigate('/signup');  changeTheme(); }} >Sign up</p>
            <span style={{ display: 'flex' }}>
              <p>Cart</p>
              <HiOutlineShoppingCart />
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
          <h2 style={{ color: '#003F62' }}>30 Days Free return</h2>
        </div>
      </div>
    </header >
  )
}
export default Header