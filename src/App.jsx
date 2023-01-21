import { useState, useContext } from 'react'
import './App.css'
import Header from './HOME PAGE/Header/Header'
import Footer from './HOME PAGE/Footer/Footer'
import Home from './HOME PAGE/Home'
import AllCategories from './ALL_CATEGORIES/AllCategories'
import Detail from './DETAIL/Detail'
import Login from './LOGIN/Login'
import Signup from './SIGNUP/Signup'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeContext } from './Components/ContexApi/Contex'
function App() {
  // const [state, setState] = useState(false)
  const { theme } = useContext(ThemeContext)
  // console.log(theme)
  return (
    <div className='App'>
      <Router>
        {!theme ? <Header /> : null}
        <Routes>
          <Route path={'*'} element={<Home />} />
          <Route path={'/Catogories'} element={<AllCategories />} />
          <Route path={'/detail/:id'} element={<Detail />} />
          <Route path={'/login'} element={<Login/>} />
          <Route path={'/signUp'} element={<Signup />} />
        </Routes>
        {!theme ? <Footer /> : null}
      </Router>
      <Router>

      </Router>
    </div>
  )
}

export default App
