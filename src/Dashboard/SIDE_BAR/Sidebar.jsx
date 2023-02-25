import React from 'react'
import './sidebar.css'
import { NavLink } from 'react-router-dom'


export default function Sidebar(props) {

  return (
    <div className='sidecar_comp'>
      <p className='P'>{props.title}</p>
      <div className='nav_contain'>
        <NavLink className='navs' to={props.rout1}>{props.icon1}<p>{props.title1}</p></NavLink>
        <NavLink className='navs' to={props.rout2} >{props.icon2}<p>{props.title2}</p></NavLink>
        {props.title3 && <NavLink className='navs'>{props.icon3}<p>{props.title3}</p></NavLink>}
      </div>
    </div>
  )
}
