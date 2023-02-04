import "./payment.css"
import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../Components/ContexApi/Contex";
const StyledContainer = styled.h1`
width: 100%;
height: 100vh;
display: flex;
flex-direction:column;
align-items: center;
justify-content: center;
gap:20px;
@media (width:425px){
  font-size:20px;
  }
  @media (width:375px){
    font-size:20px;
    }
    @media (width:320px){
      font-size:20px;
      }
`;
const Styledbutton = styled.button`
width: 10%;
height:5%;
display: flex;
align-items: center;
justify-content: center;
border-radius:10px;
border-color:transparent;
background-color: #FFA903;
font-size:20px;
font-weight:700;
@media (width:768px){
width: 25%;
height:5%;
font-size:25px;
}
@media (width:425px){
  width: 25%;
  height:5%;
  font-size:20px;
  }
  @media (width:375px){
    width: 25%;
    height:5%;
    font-size:20px;
    }
    @media (width:320px){
      width: 25%;
      height:5%;
      font-size:20px;
      }
`;

export default function () {
  const navigate = useNavigate()
  const { changeTheme, display } = useContext(ThemeContext)
  const cart = useSelector((state) => state.Commerce.cart)
  const Total = () => {
    let Total = 0;
    cart.map((i) => Total += i.total)
    return Total
  }
  useEffect(() => {
    !display && changeTheme()
  }, [])
  return (
    <StyledContainer>
      Payment is still under development
      <Styledbutton onClick={() => { navigate('/') }}  >
        back
      </Styledbutton>
    </StyledContainer>
  )
}