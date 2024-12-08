import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";



function Navbar() {

  const [hamburger, setHamburger] = useState(false)


  return (
    <>
      <header className="w-full bg-[#F1F2F6] text-[#2F3542] drop-shadow-lg shadow-black ">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold cursor-pointer max-sm:text-sm ">
            <Link to={"/"}> Deen-e-Islam</Link>
          </h1>

          <nav className="hidden max-sm:block "  >
            
            <button onClick={()=>setHamburger(!hamburger)}  >
              {
                hamburger ?  <RxCross2 className="relative z-[999] font-black text-xl  " /> : <FaBars />  
              }
            </button>           
            
            
            <div className={` z-20 absolute top-0 right-0 w-72 h-[100vh] bg-green-700 ${hamburger ? 'block' : 'hidden'} `}>
              
              <div className="flex flex-col mt-32 font-medium space-y-4 text-lg tracking-wider ">
                <a href="/" className="mx-4 hover:underline">
                  Home
                  <hr />
                </a>
                <a href="/exploreblogs" className="mx-4 hover:underline">
                  Blogs
                  <hr />
                </a>
                <a href="/about" className="mx-4 hover:underline">
                  About
                  <hr />
                </a>
                <a href="/contact" className="mx-4 hover:underline">
                  Contact
                  <hr />
                </a>
              </div>
              
            </div>
          </nav>

          <nav className="max-sm:hidden" >
            <a href="/" className="mx-4 hover:underline">
              Home
            </a>
            <a href="/exploreblogs" className="mx-4 hover:underline">
              Blogs
            </a>
            <a href="/about" className="mx-4 hover:underline">
              About
            </a>
            <a href="/contact" className="mx-4 hover:underline">
              Contact
            </a>
            {
              localStorage.getItem('auth-token') ? 
               <button className="bg-[#FF4757] text-[#fff] px-4 py-2 rounded-md font-semibold hover:bg-[#E63946] transition duration-300" 
                onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}
               >
                Logout
               </button> :
              <Link
                to="/loginsignup"
                className="bg-[#FF4757] text-[#fff] px-4 py-2 rounded-md font-semibold hover:bg-[#E63946] transition duration-300"
              >
              Login 
              </Link>
            }
          </nav>


        </div>
      </header>
    </>
  );
}

export default Navbar;
