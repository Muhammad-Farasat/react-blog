import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from '../Loader/Loader'

export const DisplayBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const fetchBlog = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${backend_url}/getblog`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setBlogs(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Error while getting blogs on frotend", error);
    }finally{
      setLoading(false)
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteResposne = await fetch(`${backend_url}/removeblog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify( id ),
      });

      setBlogs(blogs.filter((blog) => blog._id !== id));

      if (!deleteResposne.ok) {
        throw new error("failed to delete.");
      }

      // window.location.reload();
    } catch (error) {
      console.error("There is error in deleting");
    }
  };

  const handleEdit = (blog, id) => {
    const path = `/admin/updateblog/${id}`;
    console.log("Navigating to:", path);
    navigate(path);
  };

  const truncateDescription = (text, limit) => {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <>
      <div className="w-full h-[100vh] overflow-auto p-8 max-lg:p-6 max-sm:p-4 max-sm:h-auto">
        <h1
          className="text-2xl font-bold text-[#2F3542] mb-6 text-center 
    max-sm:text-xl max-sm:mb-4"
        >
          All Blogs
        </h1>
        {
          loading ? <Loader /> : 
          <>
          {blogs.length === 0 ? (
            <p
              className="text-gray-600 text-center text-lg 
        max-sm:text-base"
            >
              No blogs found.
            </p>
          ) : (
            <div className="space-y-4 max-sm:space-y-3">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="p-4 border rounded-md shadow-md hover:shadow-lg transition 
              max-sm:p-3 max-sm:rounded-sm"
                >
                  <div
                    className="flex justify-between items-center mb-2 
              max-sm:flex-col max-sm:items-start max-sm:gap-2"
                  >
                    <h2
                      className="text-xl font-semibold text-gray-800 
                max-sm:text-lg"
                    >
                      {blog.title}
                    </h2>

                    <div className="flex gap-2 max-sm:w-full max-sm:justify-start">
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 
                    max-sm:px-2 max-sm:py-1 max-sm:text-sm"
                        onClick={() => handleEdit(blog, blog._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 
                        max-sm:px-2 max-sm:py-1 max-sm:text-sm"
                        onClick={() => handleDelete(blog._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <img
                    src={blog.image}
                    alt="Blog"
                    className="w-full h-40 object-cover rounded-md mb-3 
                max-sm:h-32 max-sm:rounded-sm"
                  />

                  <p className="text-gray-700 text-base max-sm:text-sm">
                    {truncateDescription(blog.description, 100)}
                  </p>
                </div>
              ))}
            </div>
          )}
          </>
        }

      </div>
    </>
  );
};
