import React from 'react'
import './inventory.css'
import { GrMoney } from "react-icons/gr";
import image from "./image.jpeg"
function Inventory(props) {


  return (
    <div className='inventory'>
      <div className='inventory_wrap'>
        <div className='inventory_top'>
          <div className='inventory_top_wrap'>
            <div className='inventory_top_wrap_amount'><h1>Total products:</h1><h1>5000</h1></div>
            <div className='inventory_top_wrap_cashout'><GrMoney fontSize={30} /> <p>Cash out</p></div>
          </div>
        </div>


        <div className='inventory_main'>
          <div className='inventory_main_head'>
            <h4>products</h4>
            <p>Last 7days</p>
          </div>
          <div className='inventory_main_card'>
            <div className='inventory_main_card_head'>
              <div className='inventory_main_card_head_wrap'>
                <p>Item</p>
                <div className='inventory_main_card_head_wrap_detail'>
                  <p>Type</p>
                  <p>Date</p>
                  <p>Price</p>
                </div>
              </div>
            </div>
            <div className='inventory_Card'>
              <div className='inventory_Card_wrap'>
                <div className='inventory_Card_image'>
                  <img style={{ width: 100, height:100 }} src={image} />
                  <h3>Computer Chair</h3>
                </div>
                <div className='inventory_Card_details'>
                  <p>Type</p>
                  <p>Date</p>
                  <p>Price</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Inventory