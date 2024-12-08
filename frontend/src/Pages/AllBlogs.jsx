import React, { useState, useEffect } from "react";
import Card from "../Components/Card/Card";
import Navbar from "../Components/NavBar/Navbar";
import Footer from "../Components/Footer/Footer";



function AllBlogs() {
  const [blogs, setBlogs] = useState([]);

  const url = import.meta.env.VITE_BACKEND_URL

  const getAllBlogs = async() =>{
    const allBlogs = await fetch(`${url}/getblog`,{
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })

    const data = await allBlogs.json()
    setBlogs(data)

  }

  useEffect(()=>{
    getAllBlogs()
  },[])

  return (
    <>
      <Navbar/>
      <section className="py-16">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-[#111827] mb-8 text-center">
            All Blogs
          </h1>

          {blogs.length === 0 ? (
            <p className="text-center text-gray-500">No blogs available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Card
                  key={blog._id}
                  title={blog.title}
                  description={blog.description}
                  image={blog.image}
                  id={blog._id}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default AllBlogs;
