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
            <div className='inventory_top_wrap_amount'><h1>{props.title}</h1><h1>{props.amount}</h1></div>
            {props.sold && <div className='inventory_top_wrap_cashout'><GrMoney fontSize={30} /><p>Cash out</p></div>}
          </div>
        </div>

        <div className='inventory_main'>
          <div className='inventory_main_head'>
            <h4>{props.subtitle}</h4>
            <p>Last 7days</p>
          </div>
          <div className='inventory_main_card'>
            <div className='inventory_main_card_head'>
              <div className='inventory_main_card_head_wrap'>
                <p>Item</p>
                <div className='inventory_main_card_head_wrap_detail'>
                  <p>Categories</p>
                  <p>Quantity</p>
                  <p>Price</p>
                </div>
              </div>
            </div>
            {props.addProduct?.map((i) => (
              < div className='inventory_Card'>
                <div className='inventory_Card_wrap'>
                  <div className='inventory_Card_image'>
                    <img style={{ width: 100, height: 100 }} src={i.image} />
                    <h3>Computer Chair</h3>
                  </div>
                  <div className='inventory_Card_details'>
                    <p>{i.categories}</p>
                    <p>{i.stockQuantity}</p>
                    <p>{i.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  )
}
export default Inventory