import React from 'react'
import styled from "styled-components";
import { HiOutlineShoppingCart } from "react-icons/hi";
const EmptyCont = styled.div`
width:85%;
height:400px;
background-color:#fff;
display:flex;
flex-direction:column;
gap:20px;
align-items:center;
justify-content:center;
border-radius:5px;
@media (width:425px){
 width:95%
}
@media (width:375px){
  width:95%
}
@media (width:320px){
  width:95%
}
`;
const CartCont = styled.div`
width:150px;
height:150px;
background-color:#f8f8f8;
display:flex;
align-items:center;
justify-content:center;
border-radius:100px;
`;
const H4 = styled.h4`
font-Size:25px;
@media (width:425px){
  font-Size:20px;
}
@media (width:375px){
  font-Size:20px;
}
@media (width:320px){
  font-Size:20px;
}
`
const P = styled.p`
font-Size:17px;
@media (width:425px){
  font-Size:14px;
}
@media (width:375px){
  font-Size:14px;
}
@media (width:320px){
  font-Size:14px;
}
`
const Button = styled.button`
height:50px;
padding:0px 20px;
border-radius:5px;
border-color:transparent;
background-color:#F68B1F;
font-Size:15px;
font-weight:700;
color:#f8f8f8
`

export default function Emptycart(props) {

  return (
    <EmptyCont>
      <CartCont >
        <HiOutlineShoppingCart fontSize={100} color={'#F68B1F'} />
      </CartCont>
      <H4 >
        Your cart is empty!
      </H4>
      <P>
        Browse our categories and discover our best deals!
      </P>
      <Button>
        START SHOPPING
      </Button>
    </EmptyCont>
  )
}
