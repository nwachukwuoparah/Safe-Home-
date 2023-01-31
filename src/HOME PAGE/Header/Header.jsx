import React, { useContext, useEffect, useState } from 'react'
import './header.css'
import Logo from './Union.svg'
import Unionheader from './Union header.svg'
import { TbUserCircle } from "react-icons/tb";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { VscClose } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../Components/ContexApi/Contex'
import { useSelector } from 'react-redux';
function Header() {
  const [mobile, setMobile] = useState(true)
  const [category, setCategory] = useState(false)
  const [mobileCategory, setmobilCategory] = useState(false)
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

          {mobile ? <FiMenu onClick={() => setMobile(!mobile)} className='mobile_menu' fontSize={25} /> :
            <div className='mobile_sidebar_cont'>
              <div className='mobile_sidebar'>
                <div className='mobile_sidebar_close'>
                  <div className='mobile_sidebar_close_wrap '>
                    <div></div>
                    <TbUserCircle className='pointer adm' onClick={() => { Navigate('/dashboard') }} fontSize={30} />
                  </div>

                </div>
                <div className='mobile_sidebar_wrap'>
                  <div onClick={() => setmobilCategory(!mobileCategory)}><p>All category</p> </div>
                  {mobileCategory && <div className='All_category'>
                    <p>beds.</p>
                    <p>cabinets.</p>
                    <p>chairs and seating.</p>
                    <p>chests.</p>
                    <p>desks.</p>
                    <p>tables.</p>
                  </div>}

                </div>
                <div className='mobile_sidebar_wrap_profile'>
                  {/* <p onClick={() => { Navigate('/signup'); }} >Sign up</p> */}
                  <span className='logout'><CiLogout fontSize={20} /><p>Log Out</p></span>
                </div>
              </div>
              <div onClick={() => setMobile(!mobile)} className='mobile_sidebar_invisible'></div>
            </div>

          }

          <nav className='hi_2' >
            <img className='pointer' onClick={() => Navigate('/')} style={{ width: 70 }} src={Logo} />
            <div className='input'>
              <input />
              <BsSearch className='pointer' />
            </div>
          </nav>

          <nav className='hl_2'>
            <TbUserCircle className='pointer adm' onClick={() => { Navigate('/dashboard') }} fontSize={30} />
            <p onClick={() => { Navigate('/login'); }} >Login</p>
            <p onClick={() => { Navigate('/signup'); }} >Sign up</p>
            <span className='pointer adm' onClick={() => Navigate('/cart')} style={{ display: 'flex' }}>
              <p >Cart</p>
              <HiOutlineShoppingCart className='pointer adm' />{cart.length !== 0 ? <sup>{quantity()}</sup> : null}
            </span>
          </nav>
        </div>
      </div>

      <div className='header2'>
        <div className='header2_wrap'>
          <div
            onMouseEnter={() => setCategory(true)}
            onMouseLeave={() => setCategory(false)}
            onClick={() => Navigate('/Catogories')} className='catigories pointer'>
            <FiMenu fontSize={30} />
            <p>All category</p>
          </div>

          {category && <div onMouseEnter={() => setCategory(true)} onMouseLeave={() => setCategory(false)} className='categories'>
            <p>beds.</p>
            <p>cabinets.</p>
            <p>chairs and seating.</p>
            <p>chests.</p>
            <p>desks.</p>
            <p>tables.</p>
          </div>}
          <img className='pointer mobile_logo' onClick={() => Navigate('/')} style={{ width: 80 }} src={Unionheader} />
          <h3 style={{ color: '#003F62' }}>30 Days Free return</h3>
          <span className='mobile_cart' onClick={() => Navigate('/cart')} style={{ display: 'flex' }}>
              <p >Cart</p>
              <HiOutlineShoppingCart className='pointer adm' />{cart.length !== 0 ? <sup>{quantity()}</sup> : null}
            </span>
        </div>
      </div>

    </header>
  )
}
export default Header