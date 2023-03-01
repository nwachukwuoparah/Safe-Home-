import React from 'react'
import './sidebar.css'
import { NavLink } from 'react-router-dom'


export default function Sidebar(props) {

  return (
    <div className='sidecar_comp'>
      <p className='P'>{props.title}</p>
      <div className='nav_contain'>
        <NavLink style={{ color: !props.state && 'rgba(94, 6, 177, 20%)', backgroundColor: !props.state && '#f8f8f8' }} className={({ isActive }) => (isActive ? 'navs' : 'navs1')} to={props.rout1}>{props.icon1}<p>{props.title1}</p></NavLink>
        <NavLink style={{ color: !props.state && 'rgba(94, 6, 177, 20%)', backgroundColor: !props.state && '#f8f8f8' }} className={({ isActive }) => (isActive ? 'navs' : 'navs1')} to={props.rout2} >{props.icon2}<p>{props.title2}</p></NavLink>
        {props.title3 && <NavLink style={{ color: !props.state && 'rgba(94, 6, 177, 20%)', backgroundColor: !props.state && '#f8f8f8' }} className={({ isActive }) => (isActive ? 'navs' : 'navs1')}>{props.icon3}<p>{props.title3}</p></NavLink>}
      </div>
    </div >
  )
}
