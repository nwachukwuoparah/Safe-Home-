import './categoriesroute.css'
import React from 'react'

function Categoriesroute({ item }) {

  return (
    <div className='route'>
      <div className='route_wrap'>
        <div className='indicator'>
          <h5>{item}</h5>
        </div>
      </div>
    </div>
  )
}
export default Categoriesroute