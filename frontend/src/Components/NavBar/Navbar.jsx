import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";


function Navbar() {

  const [hamburger, setHamburger] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  useLocation()

  useEffect(()=>{
    const handleScroll = () =>{
      if (window.scrollY > 1) {
        setIsScrolled(true)
      }else{
        setIsScrolled(false)
      }

    }
    window.addEventListener('scroll', handleScroll)      
    return () => window.removeEventListener('scroll', handleScroll)
  },[])

  const isHomePage = location.pathname === '/'


  return (
    <>
      <header className={`w-full transition ease-linear sticky z-20 top-0
       ${isScrolled || !isHomePage ? ' text-[#2F3542] bg-[#F1F2F6]  drop-shadow-lg shadow-black' : 'bg-transparent text-[#f1f2f6] '}  `}>
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
            
            
            <div className={` z-20 absolute top-0 right-0 w-72 h-[100vh] bg-red-600 ${hamburger ? 'block' : 'hidden'} `}>
              
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
            <Link to='/' className="mx-4 hover:underline">
              Home
            </Link>
            <Link to="/exploreblogs" className="mx-4 hover:underline">
              Blogs
            </Link>
            <Link to="/about" className="mx-4 hover:underline">
              About
            </Link>
            <Link to="/contact" className="mx-4 hover:underline">
              Contact
            </Link>
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
