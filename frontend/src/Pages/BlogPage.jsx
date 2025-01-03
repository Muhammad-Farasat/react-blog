import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import Navbar from "../Components/NavBar/Navbar";
import Footer from "../Components/Footer/Footer";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [getComments, setGetComments] = useState([]);
  const [addComment, setAddComment] = useState("");
  const backend_url = import.meta.env.VITE_BACKEND_URL  
  

  const specificBlog = async () => {
    try {
      const responseBlog = await fetch(`${backend_url}/blog/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const checkResult = await responseBlog.json();
      setBlog(checkResult);
      setGetComments(checkResult.comments || []); // Assuming comments are part of the blog data
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async() =>{
      await specificBlog();
      await displayComments();
  }
  fetchData()
  }, []);

  const handleCommentChange = (e) => {
    setAddComment(e.target.value);
  }

  const displayComments = async () => {
    try {
      const display = await fetch(`${backend_url}/getcomment/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
  
      const response = await display.json();
  
      if (Array.isArray(response.comment)) {
        setGetComments(response.comment);
        console.log("Received comments:", response.comment);
      } else {
        console.log("No comments found.");
      }


    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }
  

  const AddComment = async (e) => {
    e.preventDefault();
  
    if (!addComment || !id) {
      console.log("Blog ID or comment is missing");
      return;
    }
  
    const token = localStorage.getItem("auth-token");
    if (!token) {
      console.log("Auth token is missing");
      return;
    }

    console.log(token);
  
    const bodyBackend = { comment: addComment, blogId: id };
    
    try {
      const response = await fetch(`${backend_url}/commentblog`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyBackend),
      });
  
      const data = await response.json();
      if (!response.ok) {
        console.error("Error from API:", data.error);
      } else {
        console.log("Comment added successfully:", data);
        setGetComments([...getComments, addComment]);
        setAddComment("");
        window.location.reload('')
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  const Addlike = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem('auth-token')

    const likeBlog = await fetch(`${backend_url}/likeblog`,{
      method: 'POST',
      headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({blogId : id})
    })

    const response = await likeBlog.json()
    if (likeBlog.ok) {
      setBlog((prevBlog) => ({...prevBlog, like: response.like}))
      
    }
    
    console.log(response.like);

    
  }

  const AddDislike = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem('auth-token')

    const likeBlog = await fetch(`${backend_url}/dislikeblog`,{
      method: 'POST',
      headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({blogId : id})
    })

    const response = await likeBlog.json()
    if (likeBlog.ok) {
      setBlog((prevBlog) =>({...prevBlog, dislike: response.dislike}))
      
    }
    
    console.log(response.dislike);

    
  }


  

  return (
    <>
      <main className="relative">
        <Navbar />
          <div className="container mx-auto py-16 px-6">
            {/* Blog Title */}
            <h1 className="text-4xl font-bold text-[#2F3542] text-center">
              {blog.title}
            </h1>

            {/* Blog Image */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-96 object-cover rounded-md mt-8"
            />

            {/* Blog Description */}
            <p className="mt-8 text-gray-700 text-lg">{blog.description}</p>

            {/* Like/Dislike Section */}
            <div className="flex items-center justify-start mt-8 space-x-4">
              <button onClick={Addlike}  className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                <FaThumbsUp />
              </button>
              <span className="text-gray-700 font-bold text-lg">
                {blog.like || 0} 
              </span>
              <button onClick={AddDislike} className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                <FaThumbsDown />
              </button>
              <span className="text-gray-700 font-bold text-lg">
                {blog.dislike || 0} 
              </span>
            </div>

            {/* Comments Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-800">Comments</h2>

              {/* Display Comments */}
              <div className="space-y-4 mt-6">
              {getComments.length > 0 ? (
                getComments.map((commentObj, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-md shadow-sm border border-gray-300"
                  >
                    <p className="text-gray-700 font-bold">{commentObj.userId?.username || "Anonymous"}:</p> {/* Display username */}
                    <p className="text-gray-600">{commentObj.comment}</p> {/* Display comment */}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
              )}
            </div>


              {/* Add Comment */}
              <form className="mt-6">
                <textarea
                  placeholder="Add your comment here..."
                  value={addComment}
                  onChange={handleCommentChange}
                  className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none"
                  rows="4"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                  onClick={AddComment}
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        <Footer />
      </main>
    </>
  );
};

export default BlogPage;
