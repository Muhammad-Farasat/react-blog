import React from "react";
import LatestBlog from "../Components/LatestBlog/LatestBlog";
import Navbar from "../Components/NavBar/Navbar";
import Footer from "../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate()
  const nav = () =>{
    navigate('/exploreblogs')
  }

  return (
    <>
      <section className=" bg-hero bg-bottom bg-cover h-[80vh] text-center relative ">
        <Navbar/>
        <div className="bg-[#11111188] w-full h-full absolute top-0 "></div>
        <div className="container mx-auto relative z-10 top-52 ">
          <h2 className="text-4xl font-bold text-white">
            Welcome to Islamic Blog
          </h2>
          <p className="mt-4 text-gray-200">
            Discover inspiring blogs about Islam, spirituality, and more.
          </p>
          <button className="mt-6 bg-[#FF4757] text-white px-6 py-3 rounded hover:bg-[#E63946]" onClick={nav} >
            Explore Blogs
          </button>
        </div>
      </section>
      <LatestBlog />
      <Footer/>
    </>

  );
};

export default Home;
