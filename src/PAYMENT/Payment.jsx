import "./payment.css"
import React from 'react'
import { useSelector } from 'react-redux';

export default function () {
  const cart = useSelector((state) => state.Commerce.cart)
  const Total = () => {
    let Total = 0;
    cart.map((i) => Total += i.total)
    return Total
  }
  return (
    <div>
      <div>

      </div>
    </div>
  )
}