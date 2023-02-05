import { useState, useContext } from 'react'
import './App.css'
import Header from './HOME PAGE/Header/Header'
import Footer from './HOME PAGE/Footer/Footer'
import Home from './HOME PAGE/Home'
import AllCategories from './ALL_CATEGORIES/AllCategories'
import Detail from './DETAIL/Detail'
import Login from './LOGIN/Login'
import Signup from './SIGNUP/Signup'
import Cart from './CART/Cart'
import Dashboard from './Dashboard/Dashboard'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeContext } from './Components/ContexApi/Contex'
import Payment from './PAYMENT/Payment'
function App() {
  // const [state, setState] = useState(false)
  const {display } = useContext(ThemeContext)
  // console.log(theme)
  return (
    <div className='App'>
      <Router>
        {!display ? <Header /> : null}
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/payment'} element={<Payment />} />
          <Route path={'/Catogories'} element={<AllCategories />} />
          <Route path={'/detail/:id'} element={<Detail />} />
          <Route path={'/cart'} element={<Cart />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/signUp'} element={<Signup />} />
          <Route path={'/dashboard/*'} element={<Dashboard />} />
        </Routes>
        {!display ? <Footer /> : null}
      </Router>
      <Router>
      </Router>
    </div>
  )
}

export default App
