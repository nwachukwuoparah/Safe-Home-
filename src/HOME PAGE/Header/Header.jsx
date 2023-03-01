import React, { useContext, useEffect, useState, useRef } from 'react'
import './header.css'
import Logo from './Union.svg'
import Unionheader from './Union header.svg'
import { TbUserCircle } from "react-icons/tb";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { VscClose } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import { MdPending } from "react-icons/md";
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import { ThemeContext } from '../../Components/ContexApi/Contex'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { clearUser } from '../../REDUX/features';
function Header() {
  const searchRef = useRef('')
  const dispach = useDispatch()
  const { id } = useParams()
  const [search, setSearch] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [category, setCategory] = useState(false)
  const [mobileCategory, setmobilCategory] = useState(false)
  const [categories, setCategories] = useState([])
  const cart = useSelector((state) => state.Commerce.cart)
  const user = useSelector((state) => state.Commerce.user)
  const order = useSelector((state) => state.Commerce.addOrder)
  const [userorder, setuserOrder] = useState({})
  const Navigate = useNavigate()
  console.log(id)
  const { changeTheme, notice, activeuser, searchinput, setSearchInput } = useContext(ThemeContext)
  // console.log(data)
  const quantity = () => {
    let QTY = 0;
    cart.map((i) => QTY += i.QTY)
    return QTY
  }
  // {console.log(user[0]?.data.data._id)}
  const logOut = async () => {
    const res = await axios.post(`https://safehomefurniture.onrender.com/api/logout/${id}`)
    // console.log(res.status)
    res.status === 200 ? dispach(clearUser()) : console.log("it did not run")
    res.status === 200 ? Navigate('login') : null
  }

  const getOrder = async () => {
    try {
      const res = await axios.get(`https://safehomefurniture.onrender.com/api/order/${order?._id}`)
      setuserOrder(res.data.data)
      // console.log(res.data.data)
    } catch (e) {
      console.log(e)
    }
  }

  const getCategories = async () => {
    try {
      const res = await axios.get(`https://safehomefurniture.onrender.com/api/allCates/category`)
      setCategories(res.data.data)
      // console.log(res.data.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    order._id ? getOrder() : null;
    // console.log(order._id)
    getCategories()
  }, [])

  useEffect(() => {
    searchRef.current.value = '';
  }, [searchinput])

  return (
    <header className='header' >
      <div className='header1'>
        <div className='header1_wrap'>
          <img className='pointer mobile_logo' onClick={() => Navigate('/')} style={{ width: 100 }} src={Unionheader} />
          {search ? <div className='mobile_input'>
            <input placeholder='Search Products' />
            <BsSearch className='pointer' onClick={() => setSearch(!search)} fontSize={13} />
          </div> : <div className='mobile_nav'>
            <BsSearch onClick={() => setSearch(!search)} className='pointer' />

            <TbUserCircle className='pointer adm' onClick={() => {
              if (user?.[0]?.data?.data.isAdmin) {
                Navigate('/dashboard')
              } else if (user?.[0]?.data?.data.isSuperAdmin) {
                Navigate('/admin')
              } else {
                return
              }
            }} fontSize={25} />
            <span className='mobile_cart' onClick={() => Navigate('/cart')} >
              <p >Cart</p>
              <HiOutlineShoppingCart className='pointer adm' />{cart.length !== 0 ? <sup>{quantity()}</sup> : null}
            </span>
          </div>}

          <nav className='hi_2' >
            <img className='pointer' onClick={() => Navigate('/')} style={{ width: 150 }} src={Logo} />
            <div className='input'>
              <input ref={searchRef} placeholder='Search Products' />
              <BsSearch className='pointer' onClick={() => { setSearchInput(searchRef.current.value); Navigate('/') }} />
            </div>
          </nav>
          <nav className='hl_2'>
            <TbUserCircle className='pointer adm' onClick={() => {
              if (user?.[0]?.data?.data.isAdmin) {
                Navigate('/dashboard')
              } else if (user?.[0]?.data?.data.isSuperAdmin) {
                Navigate('/admin')
              } else {
                return
              }
            }} fontSize={30} />
            {user?.[0]?.status === 201 ? <span className='logout adm' onClick={() => { logOut() }}  ><p>Log Out</p><CiLogout fontSize={20} /></span> : <p onClick={() => { Navigate('/login'); }} className="adm" >Login</p>}
            {user?.[0]?.status === 201 ? null : <p onClick={() => { Navigate('/signup'); }} className="adm" >Sign up</p>}

            <div className='pointer adm logout' onClick={() => Navigate('/cart')} style={{ display: 'flex' }}>
              <p>Cart</p>
              <span>
                <HiOutlineShoppingCart className='pointer' />{cart.length !== 0 ? <sup>{quantity()}</sup> : null}
              </span>

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
            {categories?.map((i) => (<NavLink><p>{i.categoryName}</p></NavLink>))}
          </div>}
          {mobile && <div></div>}
          {!mobile ? <FiMenu onClick={() => setMobile(!mobile)} className='mobile_menu' fontSize={25} /> :
            <div className='mobile_sidebar_cont'>
              <div onClick={() => !mobile ? setMobile(!mobile) : null} className='mobile_sidebar'>
                <div className='mobile_sidebar_close'>
                  <div className='mobile_sidebar_close_wrap '>
                    {!userorder?.delivered && !userorder?._id && <div></div>}
                    {!userorder?.delivered && userorder?._id && <MdPending fontSize={30} color={'#f8f8f8'} onClick={() => { Navigate('/order') }} />}
                    {user[0]?.data.data.isAdmin ? <TbUserCircle className='pointer adm ' onClick={() => { Navigate('/dashboard') }} fontSize={30} /> : <TbUserCircle className='pointer adm' fontSize={50} />}
                  </div>
                </div>
                <div className='mobile_sidebar_wrap'>
                  <div onClick={() => { setmobilCategory(!mobileCategory); Navigate('/Catogories') }}><p>All category</p> </div>
                  {mobileCategory && <div className='All_category'>
                    {categories?.map((i) => (<NavLink><p>{i.categoryName}</p></NavLink>))}
                  </div>}
                </div>
                <div className='mobile_sidebar_wrap_profile'>
                  {user?.data?.status === 201 ? <span className='logout' onClick={() => { logOut() }} ><CiLogout fontSize={20} /><p>Log Out</p></span> : <p onClick={() => { Navigate('/signup'); }} >Sign up</p>}
                </div>
              </div>
              <div className="invisible" onClick={() => setMobile(!mobile)}></div>
            </div>}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {!userorder?.delivered && userorder?._id && <MdPending className='order_icon' fontSize={25} color={'#003F62'} onClick={() => { Navigate('/order') }} />}
            <h3 style={{ color: '#003F62' }}>30 Days Free return</h3>
          </div>

        </div>
      </div>

    </header >
  )
}
export default Header