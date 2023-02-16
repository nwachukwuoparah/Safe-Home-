import React, { useState, useEffect } from 'react'
import { MdOutlineStarPurple500 } from "react-icons/md";
import styled from "styled-components";
import axios from 'axios';
const StyledRatingUl = styled.div`
gap:10px;
display: flex;
align-items: center;
justify-content: center;
font-size:20px;
@media (width:768px){
  font-size:50px;
}
@media (width:425px){
  font-size:25px;
}
@media (width:375px){
  font-size:30px;
}
@media (width:320px){
  font-size:30px;
}
`;
const StyledRatingLi = styled.div`
`;

const Star = ({ yellow }) => {
  return (
    <MdOutlineStarPurple500 style={{ color: yellow ? '#e69b04' : "" }} />
  )
}

export default function Rating(props) {
  const [rating, setRating] = useState(0)
  const [hoverindex, setHoverIndex] = useState(0)
  const [total, setTotal] = useState()


  const getProduct = async (i, id) => {
    console.log(id)
    try {
      const res = await axios.get(`https://safehomefurniture.onrender.com/api/get/${id}`)
      // console.log(res.data.data.rating)
      const total = res.data.data.rating += i
      // console.log(total)
      id === res.data.data._id ? handleRating(id, total) : null
    } catch (e) {
      console.log(e)
    }
  }


  const handleRating = async (id, rate) => {
    console.log(id)
    try {
      const res = await axios.patch(`https://safehomefurniture.onrender.com/api/rate/${id}`, { rating: rate })
      // console.log(res)
    } catch (e) {
      console.log(e)
    }

  }
  useEffect(() => {
    // console.log(rating)
  }, [rating])

  return (

    <div className='order_item'>
      <p>{props.title}</p>
      <StyledRatingUl>
        {
          [1, 2, 3, 4, 5].map((i) => (
            <StyledRatingLi
              onMouseEnter={() => { setHoverIndex(i) }}
              onMouseLeave={() => { setHoverIndex(0) }}
              onClick={() => { getProduct(i, props.id) }}
              key={i}> <MdOutlineStarPurple500 style={{ color: (i <= hoverindex) || (i <= rating) ? '#e69b04' : "" }} />
            </StyledRatingLi>
          ))}
      </StyledRatingUl>
    </div>
  )
}
