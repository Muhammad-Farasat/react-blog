import React, { useState } from "react";
import { Modal } from "antd";
import Loader from "../Loader/Loader";

export const AddBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    image: null,
    description: "",
  });

  const formReset = () =>{
    setBlog({
      title: "",
      image: null,
      description: "",
     })
}

  const [loading, setLoading] = useState(false);

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setBlog((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const addBlog = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    
    try {
      if (!blog.image) {
        console.error("No image selected!");
        return;
      }
    
      const formData = new FormData();
      formData.append("image", blog.image);
      
      const imageResponse = await fetch(`/upload`, {
        method: "POST",
        body: formData, 
      });

      if (!imageResponse.ok) {
        console.error("Image upload error", await imageResponse.text());
        return;
      }

      const imageResult = await imageResponse.json();
      const imageUrl = imageResult.image_url;
      console.log("Uploaded image URL:", imageUrl);

      const blogData = {
        title: blog.title,
        description: blog.description,
        image: imageUrl,
      };

      const blogResponse = await fetch(`/addblog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (!blogResponse.ok) {
        console.error("Blog upload error", await blogResponse.text());
        return;
      }

      const blogResult = await blogResponse.json();
      console.log("Blog uploaded successfully!", blogResult);

      Modal.success({
        content: "Blog added successfully",
      });

      formReset()


    } catch (error) {
      console.error("Error in adding blog:", error);
    } finally {
      setLoading(false);
    }

    

  };

  return (
    <>
      <div className="w-full max-w-6xl h-[100vh] mx-auto py-8 max-lg:py-6 max-sm:h-auto">
        <h1 className="text-2xl font-bold text-[#2F3542] mb-6 text-center max-sm:text-xl max-sm:mb-4">
          Add a New Blog
        </h1>

        <form id="addBlogForm" className="space-y-4 px-8 max-sm:space-y-3">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600 max-sm:text-xs"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={blog.title}
              placeholder="Enter blog title"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF4757] focus:border-[#F1F2F6] 
          max-sm:px-3 max-sm:py-1.5 max-sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-600 max-sm:text-xs"
            >
              Banner Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF4757] focus:border-[#F1F2F6] 
          max-sm:px-3 max-sm:py-1.5 max-sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600 max-sm:text-xs"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="16"
              placeholder="Enter blog description"
              value={blog.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF4757] focus:border-[#F1F2F6] 
          max-sm:px-3 max-sm:py-1.5 max-sm:text-sm max-sm:rows-10"
              required
            ></textarea>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <button
              className="w-full bg-[#FF4757] text-white py-2 rounded-md hover:bg-[#E63946] transition duration-300 
                max-sm:py-1.5 max-sm:text-sm"
              onClick={addBlog}
            >
              Add Blog
            </button>
          )}
        </form>
      </div>
    </>
  );
};
