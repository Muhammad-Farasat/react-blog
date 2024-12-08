import React from 'react'
import { AddBlog } from '../Components/AddBlog/AddBlog'
import { SideBar } from '../Components/SideBar/SideBar'
import { DisplayBlog } from '../Components/DisplayBlog/DisplayBlog'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import UpdateBlog from '../Components/UpdateBlog/UpdateBlog'



function Admin() {


  const token = localStorage.getItem('auth-token')

  if (!token) {
    return <Navigate to='/adminLogin' replace />
  }

  return (
    <section className='flex max-sm:block '>
      <SideBar />
        <Routes>
          <Route path="addblog" element={<AddBlog />}  />
          <Route path="displayblog" element={<DisplayBlog />} />
          <Route path="updateblog/:id" element={<UpdateBlog />} />
          {/* <Route path="*" element={<Navigate to="displayblog" replace />} /> */}
        </Routes>
    </section>
  )
}

export default Admin