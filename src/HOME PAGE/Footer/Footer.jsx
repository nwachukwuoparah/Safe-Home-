import React from 'react'
import './footer.css'
import { IoIosSend } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { IoLogoTwitter } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { FiInstagram } from "react-icons/fi";
import Logo from './Union.svg'
import korapay from "./Korapay.png"
export default function Footer({ }) {


  return (
    <div className='footer'>
      <div className='footer_wrap'>


        <div className='News_Letter'>
          <h2>Subscribe to our Newsletter</h2>
          <div className='input_wrap'>
            <input placeholder='Email Adress' />
            <IoIosSend color='#4A4A4A' />
          </div>
        </div>


        <div className='footer_navs'>

          <p className='p'>HELP CENTER</p>
          <p className='p'>HELP CENTER</p>
          <p className='p'>TERMS & CONDITIOND</p>
          <p className='p'>BECOME AN AGENT</p>
          <p className='p'>REPORT A PRODUCT</p>

          <div className='footer_nav_wrap'>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p className=''>HELP CENTER</p></span>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p className=''>HELP CENTER</p> </span>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' />  <p className=''>TERMS & CONDITIOND</p> </span>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' />  <p className=''>BECOME AN AGENT</p> </span>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p className=''>REPORT A PRODUCT</p></span>
          </div>
        </div>


        <div className='footer_footer'>
          <img src={korapay} style={{ width: 60 }} />
          <div className='footer_socials'>
            <BsLinkedin className='mobile_footer' fontSize={30} />
            <IoLogoTwitter className='mobile_footer' fontSize={30} />
            <FiInstagram className='mobile_footer' fontSize={30} />
          </div>

        </div >
      </div >
    </div >
  )
}
