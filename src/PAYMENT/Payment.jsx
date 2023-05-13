import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../Components/ContexApi/Contex";
import { HiHome } from "react-icons/hi";
import payKorapay from "./payKorapay"
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { orderproduct } from '../REDUX/features';
import { removeOrders } from '../REDUX/features';
import { clearAll } from '../REDUX/features';
const StyledContainer = styled.h1`
width: 100%;
height: 100vh;
display: flex;
flex-direction:column;
align-items: center;
gap:50px;
// background-color:#E6E7F3;

@media only screen and (width <= 834px){
  height: 150vh;
  gap30px;
  }
`;
const Styledheader = styled.div`
width:100%;
height:10%;
display: flex;
align-items: center;
justify-content: center;
background-color:#fff;
@media only screen and (width <= 834px){
  }

`
const StyledheaderWrap = styled.div`
width:80%;
background-color:#fff;
font-Size:1.7rem;
color:#606060;
 
@media only screen and (width <= 834px){
 display: flex;
   align-items: center;
   justify-content:center;
  width:90%;
  }
`
const StyledheaderWrapinner = styled.div`
width:50%;
display: flex;
align-items: center;
justify-content: space-between;

@media only screen and (width <= 834px){
 display: flex;
   align-items: center;
   justify-content:center;
   justify-content:space-between;
  width:100%;
  }


`
const Styledbody = styled.div`
width: 80%;
height:80%;
display: flex;
flex-wrap:wrap;
align-items: center;
justify-content: center;
gap:150px;
background-color:#F8F8F8;
border-radius:5px;
box-sizing: border-box;
@media (width <= 834px){
  width: 90%;
  // background-color:red;
  gap:10px;
  height:50%;
  }
`;
const StyledbodoLeft = styled.div`
width:45%;
height:95%;
display: flex;
flex-wrap:wrap;
align-items:center;
justify-content:center;
gap:20px;
// background-color:gold;
border-radius:5px;
@media (width <= 834px){
  align-items:center;
  justify-content:center;
  gap:0px;
  width: 100%;
  }
`
const StyledbodoLefttop = styled.div`
width:90%;
display: flex;
// align-items:center;
justify-content:center;
height:15%;
background-color:#FFFFFF;
border-radius:5px;
@media (width <= 834px){
  width: 100%;
  }
`
const StyledbodoLefttopwrap = styled.div`
width:95%;
// background-color:grey;
`
const StyledbodoLeftbottom = styled.div`
width:90%;
height:80%;
background-color:#FFFFFF;
border-radius:5px;
display: flex;
flex-direction:column;
align-items: center;
justify-content: center;
gap:40px;
@media (width <= 834px){
  width: 100%;
  }
`
const Styledbodoinput = styled.input`
width:90%;
height:50px;
border-radius:5px;
border-color: transparent;
border: 1px solid #A5A5A5;
padding:0px 15px
`
const StyledbodyRight = styled.div`
width:35%;
height:95%;
display:flex;
flex-direction:column;
align-items:center;
gap:50px;
border-radius:5px;
// background-color:gold;
@media (width <= 834px){
  height:800px;
  // background-color:gold;
  gap:10px;
  width: 100%;
  }
`
const StylebodyRightCont = styled.div`
width:100%;
height:85%;
display:flex;
flex-direction:column;
align-items:center;
background-color:#fff;
border-radius:5px;
// background-color:gold;
`
const StylebodyRightContWrap = styled.div`
width:85%;
height:100%;
background-color:#fff;
`
const StylebodyRightContTop = styled.div`
width:100%;
height:10%;
display:flex;
align-items:center;
border-bottom: 1px solid #A5A5A5;
background-color:#fff;
font-size:20px;
`
const StylebodyRightContMiddle = styled.div`
width:100%;
height:75%;
border-bottom: 1px solid #A5A5A5;
background-color:#fff;
overflow-y:auto;
`
const StylebodyRightContMiddle_item = styled.div`
width:100%;
height:13%;
display:flex;
align-items:center;
justify-content:space-between;
border-bottom: 1px solid #A5A5A5;
background-color:#fff;
font-size:15px;
font-weight:0;
`
const StylebodyRightContBottom = styled.div`
width:100%;
height:15%;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
background-color:#fff;
`
const StylebodyRightContBottomWrap = styled.div`
width:100%;
height:100%;
display:flex;
align-items:center;
justify-content:space-between;
gap:20px;
// background-color:grey;
font-size:15px;
`
const StylebodyrightButton = styled.button`
width:100%;
height:10%;
background-color:#003F62;
border-radius:5px;
font-size:20px;
font-weight:700;
border-color:transparent;
color:#f8f8f8;
`

export default function () {
  const dispach = useDispatch()
  const navigate = useNavigate()
  const { changeTheme, display } = useContext(ThemeContext)
  const cart = useSelector((state) => state.Commerce.cart)
  const user = useSelector((state) => state.Commerce.user)
  const [order, setOrder] = useState({
    quantity: cart.length,
    customerAddress: "",
    phoneNumber: "",
    customerName: "",
    customerEmail: "",
    delivery: false,
    product: cart
  })

  const input = [
    {
      id: 1,
      name: "customerName",
      type: "text",
      err: "Username should be 3-16 caharters and should not include any special charater!",
      placeholder: "name",
      pattern: "^[A-Za-z0-9 ]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "customerEmail",
      type: "email",
      err: "It should be a valid email address!",
      placeholder: "email",
      required: true,
    }, {
      id: 3,
      name: "customerAddress",
      type: "text",
      err: "Password should be 8-20 charaters and include at least 1 letter, 1 number and one special charater! ",
      placeholder: "Address",
      pattern: "^[A-Za-z0-9 ]{8,20}$",
      required: true,
    }, {
      id: 4,
      name: "phoneNumber",
      type: "text",
      err: "Password dont match",
      placeholder: "Phone Number",
      pattern: 'password',
      required: true,
    }
  ]
  const Total = () => {
    let Total = 0;
    console.log(cart)
    cart.map((i) => Total += i.total)
    return Total
  }

  const handleChange = (e) => {
    e.preventDefault();
    setOrder({ ...order, [e.target.name]: e.target.value })
  }

  const order_product = () => {
    console.log("called")
    axios.post(`https://safehomefurniture.onrender.com/api/neworder/${user?.[0]?.data?.data._id}`, order)
      .then((res) => {
        res.status === 201 ? dispach(orderproduct(res.data.data)) : null
        res.status === 201 ? dispach(clearAll()) : null
        res.status === 201 ? navigate('/') : null
        // console.log(res.data.data)

      })
      .catch((error) => {
        console.log(error);
      });
  }


  const debounce = (fn, delay) => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn()
      }, delay);
    }
  }

  const createOrder = debounce(order_product, 2000)

  useEffect(() => {
    !display && changeTheme()
    console.log(user[0].data.data.name)
  }, [])



  return (
    <StyledContainer>
      <Styledheader>
        <StyledheaderWrap>
          <StyledheaderWrapinner>
            <p>CHECKOUT </p>
            < HiHome onClick={() => { navigate('/cart') }} color={'#003F62'} />
          </StyledheaderWrapinner>
        </StyledheaderWrap>
      </Styledheader>
      <Styledbody>
        <StyledbodoLeft>
          <StyledbodoLefttop>
            <StyledbodoLefttopwrap>
              <p>hello</p>
            </StyledbodoLefttopwrap>
          </StyledbodoLefttop>
          <StyledbodoLeftbottom>
            {input.map((i) => (
              <Styledbodoinput key={i.id} onChange={(e) => { handleChange(e) }} placeholder={i.placeholder} name={i.name}>
              </Styledbodoinput>
            ))}
          </StyledbodoLeftbottom>
        </StyledbodoLeft>
        <StyledbodyRight>
          <StylebodyRightCont>
            <StylebodyRightContWrap>
              <StylebodyRightContTop>
                Item
              </StylebodyRightContTop>
              <StylebodyRightContMiddle>
                {cart?.map((i) => (
                  <StylebodyRightContMiddle_item key={i._id} >
                    <p>{i.title}</p>
                    <p>{i.total}</p>
                  </StylebodyRightContMiddle_item>
                ))}
              </StylebodyRightContMiddle>
              <StylebodyRightContBottom>
                <StylebodyRightContBottomWrap>
                  <p>Delivery</p>
                  <input type="checkbox" onChange={() => { setOrder({ ...order, delivery: !order.delivery }) }} />
                </StylebodyRightContBottomWrap>
                <StylebodyRightContBottomWrap>
                  <p>Total</p>
                  <p>₦ {Total().toLocaleString()}</p>
                </StylebodyRightContBottomWrap>
              </StylebodyRightContBottom>
            </StylebodyRightContWrap>
          </StylebodyRightCont>
          <StylebodyrightButton onClick={
            function payKorapay() {
              let key = `key${Math.random()}`
              window.Korapay.initialize({
                key: 'pk_test_GEtMPZuJ3BtsD1AFT7nFq85YYQjssECg7tzDTQPd',
                reference: key,
                amount: Total(),
                currency: "NGN",
                customer: {
                  name: user[0].data.data.name,
                  email: user[0].data.data.email
                },
                onClose: function () {
                  // Handle when modal is closed
                },
                onSuccess: function (data) {
                  data.reference === key ? createOrder() : null
                  // console.log(data)
                  // console.log(key)
                },
                onFailed: function (data) {
                  // console.log(data)
                }
              });
            }
          }>
            Continue to payment
          </StylebodyrightButton>
        </StyledbodyRight>
      </ Styledbody>
    </StyledContainer >
  )
}