import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Home } from './pages/Home'
import { Footer } from './components/Footer'
import Trade from './pages/Trade'
import AboutUs from './pages/AboutUs'
import Exchanges from './pages/Exchanges'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
