import "./payment.css"
import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../Components/ContexApi/Contex";
import { HiHome } from "react-icons/hi";
import payKorapay from "./payKorapay"
const input = [
  {
    id: 1,
    name: "name",
    type: "text",
    err: "Username should be 3-16 caharters and should not include any special charater!",
    placeholder: "name",
    pattern: "^[A-Za-z0-9 ]{3,16}$",
    required: true,
  },
  {
    id: 2,
    name: "email",
    type: "email",
    err: "It should be a valid email address!",
    placeholder: "email",
    required: true,
  }, {
    id: 3,
    name: "password",
    type: "text",
    err: "Password should be 8-20 charaters and include at least 1 letter, 1 number and one special charater! ",
    placeholder: "password",
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    required: true,
  }, {
    id: 4,
    name: "confirmPassword",
    type: "text",
    err: "Password dont match",
    placeholder: " confirmPassword",
    pattern: 'password',
    required: true,
  }
  , {
    id: 5,
    name: "confirmPassword",
    type: "text",
    err: "Password dont match",
    placeholder: " confirmPassword",
    pattern: 'value.password',
    required: true,
  }
]
const StyledContainer = styled.h1`
width: 100%;
height: 100vh;
display: flex;
flex-direction:column;
align-items: center;
gap:50px;
background-color:#E6E7F3;

@media (width:425px){
  }
  @media (width:375px){
  
    }
    @media (width:320px){
   
      }
`;
const Styledheader = styled.div`
width:100%;
height:10%;
display: flex;
align-items: center;
justify-content: center;
background-color:#fff;
`
const StyledheaderWrap = styled.div`
width:80%;
background-color:#fff;
font-Size:1.7rem;
color:#606060;

@media (width:425px){
  width: 90%;
  // background-color:grey;
  }
  @media (width:375px){
    width: 90%;
    font-Size:1rem;
    }
    @media (width:320px){
      width: 90%;
      font-Size:1rem;
      }
`
const StyledheaderWrapinner = styled.div`
width:50%;
display: flex;
align-items: center;
justify-content: space-between;

@media (width:425px){
  width: 100%;
  font-Size:1.5rem;
  }
  @media (width:375px){
    width: 100%;
    font-Size:1.5rem;
    // background-color:grey;
    }
    @media (width:320px){
      width: 100%;
      font-Size:1.5rem;
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
@media (width:425px){
  width: 90%;
  }
  @media (width:375px){
    width: 90%;
    }
    @media (width:320px){
      width: 90%;
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
@media (width:425px){
  align-items:center;
  justify-content:center;
  gap:0px;
  width: 100%;
  }
  @media (width:375px){
    width: 100%;
    gap:0px;
    width: 100%;
    }
    @media (width:320px){
      width: 100%;
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
justify-content:space-between;
border-radius:5px;
// background-color:gold;
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
height:80%;
border-bottom: 1px solid #A5A5A5;
background-color:#fff;
`

const StylebodyRightContBottom = styled.div`
width:100%;
height:10%;
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
      <Styledheader>
        <StyledheaderWrap >
          <StyledheaderWrapinner >
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
              <Styledbodoinput>

              </Styledbodoinput>
            ))}
          </StyledbodoLeftbottom>

        </StyledbodoLeft>

        <StyledbodyRight>
          <StylebodyRightCont>
            <StylebodyRightContWrap>

              <StylebodyRightContTop>
                food
              </StylebodyRightContTop>

              <StylebodyRightContMiddle>
                food
              </StylebodyRightContMiddle>

              <StylebodyRightContBottom>
                <StylebodyRightContBottomWrap>
                  <p>Delivery</p>

                </StylebodyRightContBottomWrap>
                <StylebodyRightContBottomWrap>
                  <p>Total</p>
                  <p>$500</p>
                </StylebodyRightContBottomWrap>

              </StylebodyRightContBottom>

            </StylebodyRightContWrap>

          </StylebodyRightCont>
          <StylebodyrightButton onClick={() => { payKorapay(5000) }} >
            Continue to payment
          </StylebodyrightButton>
        </StyledbodyRight>
      </ Styledbody>
    </StyledContainer>
  )
}