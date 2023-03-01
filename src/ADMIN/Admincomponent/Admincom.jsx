import React from 'react'
import "./admincom.css"
export default function Admincom(props) {


  return (
    <>
      <div className='admin_dashboard_body_right_main'>
        <div className='admin_dashboard_body_right'>
          <div className='admin_dashboard_body_rightwrap'>
            <div className='admin_dashboard_top'>
              <div className='admin_dashboard_top_Wrap'>
                <h3>{props.title}</h3>
              </div>
            </div>
            <div className='admin_dashboard_bottom'>
              <div className='admin_dashboard_bottom_wrap'>
                {props.items[0]?.quantity ? <p>Quantity</p> : <p>user</p>}
                <p>Id</p>
                <p>Date</p>
                <p>Price</p>
              </div>
            </div>
            <div className='admin_dashboard_scroll' >
              {props.items?.map((i) => (

                <div className='admin_dashboard_content'>
                  <div className='admin_dashboard_content_wrap'>
                    {i.quantity ? <p>{i.quantity}</p> : <p>{i.name}</p>}
                    <p>{i._id}</p>
                    <p>{i.createdAt}</p>
                    <p>#75,000</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
