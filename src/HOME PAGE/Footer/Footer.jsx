import React from 'react'
import './footer.css'
import { IoIosSend } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { IoLogoTwitter } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { FiInstagram } from "react-icons/fi";
import Logo from './Union.svg'
export default function Footer({ }) {


  return (
    <div className='footer'>
      <div className='footer_wrap'>
        <div className='News_Letter'>
          <h2>Subscribe Newsletter</h2>
          <div className='input_wrap'>
            <input placeholder='Email Adress' />
            <IoIosSend color='#4A4A4A' />
          </div>
        </div>
        <div className='footer_navs'>
          <div className='footer_nav_wrap'>
            <h3>Find Product</h3>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p>Food</p> </span>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p>Food</p> </span>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p>Food</p> </span>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p>Food</p> </span>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p>Food</p> </span>
          </div>
          <div className='footer_nav_wrap'>
            <h3>Find Product</h3>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p>Food</p> </span>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p>Food</p> </span>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p>Food</p> </span>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p>Food</p> </span>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p>Food</p> </span>
          </div>
          <div className='footer_nav_wrap'>
            <h3>Find Product</h3>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p>Food</p> </span>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p>Food</p> </span>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p>Food</p> </span>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p>Food</p> </span>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p>Food</p> </span>
          </div>
          <div className='footer_nav_wrap'>
            <h3>Find Product</h3>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p>Food</p> </span>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p>Food</p> </span>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p>Food</p> </span>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p>Food</p> </span>
            <span className='span_nav'><IoMdArrowDropright color='#FFA903' /> <p>Food</p> </span>
          </div>
        </div>
        <div className='footer_footer'>
          <img style={{ width: 70 }} src={Logo} />
          <div className='footer_aderss'><MdLocationOn fontSize={30} /><p>2, Troy street Lagos Nigeria </p></div>
          <div className='footer_socials'>
            <BsLinkedin fontSize={30} />
            <IoLogoTwitter fontSize={30} />
            <FiInstagram fontSize={30} />
          </div>

        </div >
      </div >
    </div >
  )
}
