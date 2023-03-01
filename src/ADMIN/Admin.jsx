import React, { useEffect, useContext, useState } from 'react'
import './admin.css'
import Admincom from "./Admincomponent/Admincom"
import { HiHome } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { ThemeContext } from '../Components/ContexApi/Contex';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import Logo from './Union.svg'
import { MdOutlineInsertLink } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
function Admin(props) {
  const [search, setSearch] = useState(false)
  const [menu, setMenu] = useState(false)
  const addProduct = useSelector((state) => state.Commerce.addProduct)
  const user = useSelector((state) => state.Commerce.user)
  const [productitem, setProductitem] = useState((localStorage.getItem('Product')))
  const { changeTheme, display } = useContext(ThemeContext)
  const Navigate = useNavigate()
  const [listed, setListed] = useState(false)
  const [sold, setSold] = useState(false)
  const [allUser, setAlluser] = useState([])
  const [admin, setAdmin] = useState([])
  const [users, setUser] = useState([])
  const [orders, setOrders] = useState([])

  const getOrder = () => {
    axios.get(`https://safehomefurniture.onrender.com/api/allorder/${user[0]?.data.data._id}`)
      .then((res) => {
        setOrders(res.data.data)
        console.log(res.data.data[0])
      }).catch((e) => {
        console.log(e)
      })
  }




  const setState = (res) => {

    if (user?.[0]?.data?.data.isSuperAdmin) {

      const all_user = res.data.data.filter((i) => {
        return i._id !== user[0]?.data.data._id
      })
      setAlluser(all_user)
      console.log(all_user)

      // ADMIN
      const alladmins = res.data.data.filter((i) => {
        return i.isAdmin
      })
      setAdmin(alladmins)
      console.log(alladmins)

      const userse = res.data.data.filter((i) => {
        return !i.isAdmin && i._id !== user[0]?.data.data._id
      })
      setUser(userse)
    }


  }

  const getallusers = () => {
    axios.get(`https://safehomefurniture.onrender.com/api/allUsers/${user[0]?.data.data._id}`)
      .then((res) => {
        setState(res)
        // console.log(res.data.data)
      }).catch((e) => {
        console.log(e)
      })
  }



  useEffect(() => {
    !display && changeTheme()
    getallusers()
    getOrder()
  }, [])
  // useEffect(() => {
  //   console.log(users)
  // }, [users])
  const mobileSide = (
    <div onClick={() => setMenu(false)} className='admin_mobile_dashboard_body_left_cont '>
      <div className='admin_mobile_dashboard_body_left'>
        <div className='admin_mobile_dashboard_body_left_wrap'>
          <img style={{ width: 150 }} src={Logo} />
          <div className='admin_mobile_navs'>
            <h5>inventory</h5>

            <div className='admin_mobile_item' onClick={() => { Navigate('/admin'); setListed(false); setSold(false) }}><p>All users</p><p>5000</p></div>
            <div className='admin_mobile_item' onClick={() => { Navigate('/admin/'); setListed(true); setSold(false) }} ><p >Admins</p><p>5000</p></div>
            <div className='admin_mobile_item' onClick={() => { Navigate('/admin/'); setListed(false); setSold(true) }}><p>Users</p><p>5000</p></div>
            <div className='admin_mobile_item' onClick={() => { Navigate('/admin/'); setListed(false); setSold(true) }}><p>Orders</p><p>5000</p></div>
          </div>
          <div className='admin_mobile_dashboard_profile'>
            <img style={{ width: 50 }} src={Logo} />
            <span className='admin_mobile_logout'><CiLogout fontSize={20} /><p>Log Out</p></span>
          </div>
        </div>
      </div>
    </div>

  )
  return (
    <div className='admin_dashboard'>
      <div className='admin_dashboard_head'>

        <div className='admin_dashboard_head_wrap_mobile'>
          <FiMenu onClick={() => setMenu(!menu)} fontSize={25} />
          {menu && mobileSide}
          {search ? <div className='admin_dashboard_input'>
            <input />
            <BsSearch onClick={() => setSearch(!search)} className='pointer' fontSize={15} />
          </div> :
            <div className='admin_dashboard_head_wrap_mobile_nav'>
              <div></div>
              <BsSearch onClick={() => setSearch(!search)} className='pointer' fontSize={17} />
            </div>}

          <HiHome onClick={() => { Navigate('/') }} fontSize={30} color='#003F62' />
        </div>

        <div className='admin_dashboard_head_wrap'>
          <h2>Dashboard</h2>
          <div className='dashboard_input'>
            <input />
            <BsSearch />
          </div>
          <HiHome onClick={() => { Navigate('/') }} fontSize={40} color='#003F62' />
        </div>
      </div>

      <div className='admin_dashboard_body'>
        <div className='admin_dashboard_body_left'>
          <div className='admin_dashboard_body_left_wrap'>
            <img style={{ width: 150 }} src={Logo} />
            <div className='admin_navs'>
              <div className='admin_navs_item ' onClick={() => { Navigate('/admin/'); setListed(false); setSold(false) }}><p>All users</p><p>5000</p></div>
              <div className='admin_navs_item ' onClick={() => { Navigate('/admin/admins'); setListed(true); setSold(false) }} ><p >Admins</p><p>5000</p></div>
              <div className='admin_navs_item ' onClick={() => { Navigate('/admin/users'); setListed(false); setSold(true) }}><p>Users</p><p>5000</p></div>
              <div className='admin_navs_item ' onClick={() => { Navigate('/admin/orders'); setListed(false); setSold(true) }}><p>Orders</p><p>5000</p></div>
            </div>
            <div className='admin_dashboard_profile'>
              <img style={{ width: 50 }} src={Logo} />
              <span className='admin_logout'><CiLogout fontSize={20} /><p>Log Out</p></span>
            </div>
          </div>
        </div>


        <Routes>
          <Route path={'/'} element={<Admincom title='All users' items={allUser} />} />
          <Route path={'/admins'} element={<Admincom title='Admins' items={admin} />} />
          <Route path={'/users'} element={<Admincom title='Users' items={users} />} />
          <Route path={'/orders'} element={<Admincom title='Orders' items={orders} />} />
        </Routes>


      </div>
    </div>
  )
}
export default Admin

