import React, { useEffect, useContext, useState } from 'react'
import './dashboard.css'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './SIDE_BAR/Sidebar'
import { MdHome } from "react-icons/md";
import { BiCoinStack } from "react-icons/bi";
import { IoIosTimer } from "react-icons/io";
import { GiCardExchange } from "react-icons/gi";
import { HiOutlineUsers } from "react-icons/hi";
import { AiOutlineLink } from "react-icons/ai";
import { RiCoinsLine } from "react-icons/ri";
import { RiFileList3Line } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { TiDocumentText } from "react-icons/ti";
import { CiLogout } from "react-icons/ci";
import { BiDockBottom } from "react-icons/bi";
import { BsBell } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ThemeContext } from '../Components/ContexApi/Contex';
import { useNavigate, NavLink } from 'react-router-dom';
import Logo from './Union.svg'
import Inventory from './Inventory/Inventory';
import Addproduct from './addProducts/Addproduct';
import Update from './UPDATE/Update';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Dashboard(props) {
  const user = useSelector((state) => state.Commerce.user)
  const { changeTheme, display } = useContext(ThemeContext)
  const [item, setItem] = useState()
  const [allorders, setAllorders] = useState([])
  const [notice, setNotice] = useState(false)
  const Navigate = useNavigate()

  const sort = (val) => {
    let arr = []
    val.map((i) => (
      arr.push(...i.product)
    ));
    setAllorders(arr)
  }


  async function getAllOrders() {
    try {
      const response = await axios.get(`https://safehomefurniture.onrender.com/api/allorder/${user._id}`)
      // console.log(response.data.data)
      sort(response.data.data)
    } catch (e) {
      console.log(e)
    }
  }



  async function getItem() {
    try {
      const response = await axios.get(`https://safehomefurniture.onrender.com/api/user`)
      // dispach(AllProducts(response.data.data))
      setItem(response.data.data)
      // setLoading(true)
      // console.log(response.data.data)
    } catch (e) {
      console.log(e)
    }
  }


  useEffect(() => {
    !display && changeTheme()
    getAllOrders()
    getItem()
  }, [])


  const Item = [
    {
      title: "INVENTORY",
      title1: "All products",
      title2: "Balance",
      icon1: <MdHome fontSize={25} />,
      icon2: <BiCoinStack fontSize={25} />,
      rout1: '/dashboard/',
      rout2: '/dashboard/sold',
      state: true
    },
    {
      title: "BUSINESS",
      title1: "Transactions",
      title2: "Customers",
      icon1: <GiCardExchange fontSize={25} />,
      icon2: <HiOutlineUsers fontSize={25} />,
      state: false
    }, {
      title: "TOOLS",
      title1: "Payment links",
      title2: "Payment Buttons",
      title3: "Invoice",
      icon1: <AiOutlineLink fontSize={25} />,
      icon2: <RiCoinsLine fontSize={25} />,
      icon3: <RiFileList3Line fontSize={25} />,
      state: false
    }, {
      title: "OPERATIONS",
      title1: "Settings",
      title2: "Api Docs",
      icon1: <CiSettings fontSize={25} />,
      icon2: <TiDocumentText fontSize={25} />,
      state: false
    },
  ]
  return (
    <div className='Dashboard_contain'>
      <div className='Dashboard_left'>
        <div className='side_bar_cont'>
          <div className='Logo'>
            <img src={''} />
          </div>
          {Item?.map((i) => (
            <Sidebar {...i} />
          ))}
        </div>

      </div>

      <div className='Dashboard_rigth'>
        <div className='Dashboard_rigth_head'>
          <div className='Dashboard_rigth_head_contain'>
            <div className='Dashboard_rigth_head_nav1'><MdHome fontSize={25} onClick={() => Navigate('/')} /></div>
            <BsBell />
            <div className='Dashboard_rigth_head_nav2'
              onMouseEnter={() => { setNotice(true) }}
              onMouseLeave={() => { setNotice(false) }}
            >
              <HiOutlineUserCircle />
              <p>{user[0]?.data?.data.brandname}</p>
              <MdKeyboardArrowDown />
            </div>
            {notice && <div className='notice'
              onMouseEnter={() => { setNotice(true) }}
              onMouseLeave={() => { setNotice(false) }}
            >
              <span className='bash_logout' onClick={() => { logOut() }}  ><p>Log Out</p><CiLogout fontSize={20} /></span>
            </div>}
          </div>
        </div>
        <Routes>
          <Route path={'/'} element={<Inventory buttonC={true} product={item} />} />
          <Route path={'/sold'} element={<Inventory buttonC={false} product={allorders} />} />
          <Route path={'/update/:id'} element={<Update />} />
          <Route path={'/addproduct'} element={<Addproduct />} />
        </Routes>
      </div>
    </div>
  )
}
export default Dashboard

