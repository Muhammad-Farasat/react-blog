import React from 'react'
import './App.css'
import Admin from './Pages/Admin'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from './Pages/AdminLogin'
import Toaster from 'react-hot-toast'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/admin/*' element={<Admin/>} />
          <Route path='/adminLogin' element={<AdminLogin/>} />
          <Route path='*' element={<AdminLogin/>} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
