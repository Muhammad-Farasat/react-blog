import React, { useState, useEffect } from "react";
import Card from "../Components/Card/Card";
import Navbar from "../Components/NavBar/Navbar";
import Footer from "../Components/Footer/Footer";
import Loader from "../Components/Loader/Loader";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const getAllBlogs = async () => {
    setLoading(true);
    try {
      const allBlogs = await fetch(`${backend_url}/getblog`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const data = await allBlogs.json();
      setBlogs(data);

      getAllBlogs();
    } catch (error) {
      console.log("Error in All blog", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <>
      <main className="relative">
        <Navbar />
        <section className="py-4 h-auto ">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-[#111827] mb-8 text-center">
              All Blogs
            </h1>
            {
              loading ? <Loader /> :
              <>
                {blogs.length === 0 ? (
                  <p className="text-center text-gray-500">No blogs available.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                      blogs.map((blog) => (
                        <Card
                          key={blog._id}
                          title={blog.title}
                          description={blog.description}
                          image={blog.image}
                          id={blog._id}
                        />
                      ))
                      }
                  </div>
                )}
              </>
            }

          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

export default AllBlogs;
