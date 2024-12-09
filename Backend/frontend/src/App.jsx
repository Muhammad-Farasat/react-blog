import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import BlogPage from './Pages/BlogPage'
import AllBlogs from './Pages/AllBlogs'
import Contact from './Pages/Contact'
import About from './Pages/About'
import Auth from './Pages/Auth'

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/exploreblogs' element={<AllBlogs />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/blog/:id' element={<BlogPage />} />
        <Route path='/loginsignup' element={<Auth/>} />
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
