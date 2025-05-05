import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Home } from './pages/Home'
import { Footer } from './components/Footer'
import Trade from './pages/Trade'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar />

      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trade" element={<Trade />} />
        
      </Routes>

     

      <Footer />
    </>
  )
}

export default App
