import React from 'react'
import { Link } from 'react-router-dom'

export const SideBar = () => {
  return (
    <>
      <div className="w-[30%] h-[100vh] bg-[#F1F2F6] text-[#2F3542] drop-shadow-lg 
        max-lg:w-[30%]  
        max-sm:w-full max-sm:h-auto max-sm:flex max-sm:flex-col max-sm:items-center">
        
        <p className="font-bold text-3xl text-center pt-8 
          max-lg:text-xl max-lg:pt-4 
          max-sm:text-lg max-sm:pt-2">
          Admin Panel
        </p>
        
        <div className="mt-12 ml-8 text-xl font-medium space-y-8 
          max-lg:ml-4 max-lg:mt-8 max-lg:text-[16px] max-lg:space-y-4 
          max-sm:ml-0 max-sm:mt-4 max-sm:space-y-0 max-sm:w-full max-sm:text-center">
          
          <p className="hover:text-[#FF4757] max-sm:py-2">
            <Link to="/admin/addblog">Add Blog</Link>
          </p>
          
          <p className="hover:text-[#FF4757] max-sm:py-2">
            <Link to="/admin/displayblog">Display Blog</Link>
          </p>
        </div>
      </div>

    </>
  )
}
