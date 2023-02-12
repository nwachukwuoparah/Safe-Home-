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
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { clearUser } from '../../REDUX/features';
function Header() {
  const dispach = useDispatch()
  const [search, setSearch] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [category, setCategory] = useState(false)
  const [mobileCategory, setmobilCategory] = useState(false)
  const cart = useSelector((state) => state.Commerce.cart)
  const user = useSelector((state) => state.Commerce.user)
  const Navigate = useNavigate()
  const { changeTheme, notice, activeuser } = useContext(ThemeContext)
  // console.log(data)
  const quantity = () => {
    let QTY = 0;
    cart.map((i) => QTY += i.QTY)
    return QTY
  }
// {console.log(user[0]?.data.data._id)}
  const logOut = async () => {
    const res = await axios.post(`https://safehomefurniture.onrender.com/api/logout/:${user[0]?.data.data._id}`)
    console.log(res.status)
    res.status === 200 ? dispach(clearUser()) : console.log("it did not run")
    res.status === 200 ? Navigate('login') : null
  }

  return (
    <header className='header' >
      <div className='header1'>
        <div className='header1_wrap'>
          <img className='pointer mobile_logo' onClick={() => Navigate('/')} style={{ width: 100 }} src={Unionheader} />
          {search ? <div className='mobile_input'>
            <input />
            <BsSearch className='pointer' onClick={() => setSearch(!search)} fontSize={13} />
          </div> : <div className='mobile_nav'>
            <BsSearch onClick={() => setSearch(!search)} className='pointer' />
            
            {user[0]?.data.data.isAdmin ? <TbUserCircle className='pointer adm' onClick={() => { Navigate('/dashboard') }} fontSize={25} /> : <TbUserCircle className='pointer adm' fontSize={25} />}
            <span className='mobile_cart' onClick={() => Navigate('/cart')} >
              <p >Cart</p>
              <HiOutlineShoppingCart className='pointer adm' />{cart.length !== 0 ? <sup>{quantity()}</sup> : null}
            </span>
          </div>}

          <nav className='hi_2' >
            <img className='pointer' onClick={() => Navigate('/')} style={{ width: 150 }} src={Logo} />
            <div className='input'>
              <input />
              <BsSearch className='pointer' />
            </div>
          </nav>
        
          <nav className='hl_2'>
            {user[0]?.data?.data.isAdmin ? <TbUserCircle className='pointer adm' onClick={() => { Navigate('/dashboard') }} fontSize={30} /> : <TbUserCircle className='pointer adm' fontSize={30} />}
            {user[0]?.status === 201 ? <span className='logout' onClick={() => { logOut() }}  ><CiLogout fontSize={20} /><p>Log Out</p></span> : <p onClick={() => { Navigate('/login'); }} className="adm" >Login</p>}
            {user[0]?.status === 201 ? null : <p onClick={() => { Navigate('/signup'); }} className="adm" >Sign up</p>}
            <div className='pointer adm' onClick={() => Navigate('/cart')} style={{ display: 'flex' }}>
              <p>Cart</p>
              <HiOutlineShoppingCart className='pointer' />{cart.length !== 0 ? <sup>{quantity()}</sup> : null}
            </div>
          </nav>
        </div>
      </div>

      <div className='header2' onClick={() => setSearch(false)}>
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
          {mobile && <div></div>}
          {!mobile ? <FiMenu onClick={() => setMobile(!mobile)} className='mobile_menu' fontSize={25} /> :
            <div className='mobile_sidebar_cont'>
              <div onClick={() => !mobile ? setMobile(!mobile) : null} className='mobile_sidebar'>
                <div className='mobile_sidebar_close'>
                  <div className='mobile_sidebar_close_wrap '>
                    <div></div>
                    {user[0]?.data.data.isAdmin ? <TbUserCircle className='pointer adm ' onClick={() => { Navigate('/dashboard') }} fontSize={30} /> : <TbUserCircle className='pointer adm' fontSize={50} />}
                  </div>
                </div>
                <div className='mobile_sidebar_wrap'>
                  <div onClick={() => setmobilCategory(!mobileCategory)}><p>All category</p> </div>
                  {mobileCategory && <div className='All_category'>
                    <p onClick={() => { }}>beds.</p>
                    <p >cabinets.</p>
                    <p>chairs and seating.</p>
                    <p>chests.</p>
                    <p>desks.</p>
                    <p>tables.</p>
                  </div>}
                </div>
                <div className='mobile_sidebar_wrap_profile'>
                  {user?.data?.status === 201 ? <span className='logout' onClick={() => { logOut() }} ><CiLogout fontSize={20} /><p>Log Out</p></span> : <p onClick={() => { Navigate('/signup'); }} >Sign up</p>}

                </div>
              </div>
              <div className="invisible" onClick={() => setMobile(!mobile)}></div>
            </div>}
          <h3 style={{ color: '#003F62' }}>30 Days Free return</h3>
        </div>
      </div>

    </header >
  )
}
export default Header