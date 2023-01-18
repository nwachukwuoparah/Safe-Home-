import { useState } from 'react'
import './App.css'
import Header from './HOME PAGE/Header/Header'
import Footer from './HOME PAGE/Footer/Footer'
import Home from './HOME PAGE/Home'
import AllCategories from './ALL_CATEGORIES/AllCategories'
import Detail from './DETAIL/Detail'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {

  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/Catogories'} element={<AllCategories />} />
          <Route path={'/detail/:id'} element={<Detail />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
