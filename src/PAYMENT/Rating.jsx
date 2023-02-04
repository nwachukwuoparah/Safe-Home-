import React, { useState } from 'react'
import { MdStarOutline } from "react-icons/md";
import styled from "styled-components";

const StyledContainer = styled.div`
background-color: rgb(255, 255, 255, 90%);
width: 100%;
height: 100%;
position: fixed;
top: 0px;
left: 0px;
overflow-x: hidden;
overflow-y: hidden;
z-index: 10000;
display: flex;
align-items: center;
justify-content: center;


`;
const StyledRatingUl = styled.div`
background-color:#B3D4E5;
width: 30%;
height: 30%;
border-radius:20px;
gap:5px;
display: flex;
align-items: center;
justify-content: center;
font-size:50px;
@media (width:768px){
  width:60%;
  font-size:50px;
}
@media (width:425px){
  width:60%;
  height:20%;
  font-size:25px;
}
@media (width:375px){
  width:70%;
  height:20%;
  font-size:30px;
}
@media (width:320px){
  width:80%;
  height:20%;
  font-size:30px;
}
`;
const StyledRatingLi = styled.div`
`;

const Star = ({ yellow }) => {
  return (
    <MdStarOutline style={{ color: yellow ? 'yellow' : "" }} />

  )
}

export default function Rating(props) {
  const [rating, setRating] = useState(0)
  const [hoverindex, setHoverIndex] = useState(0)
  return (
    <StyledContainer >
      <StyledRatingUl>
        {
          [1, 2, 3, 4, 5].map((i) => (
            <StyledRatingLi
              onMouseEnter={() => { setHoverIndex(i) }}
              onMouseLeave={() => { setHoverIndex(0) }}
              onClick={() => { setRating(i) }}
              key={i}><Star yellow={(i <= hoverindex) || (i <= rating)} /></StyledRatingLi>
          ))}
      </StyledRatingUl>
    </StyledContainer>
  )
}
