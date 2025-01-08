import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Modal } from "antd";
import Loader from '../Loader/Loader';


function UpdateBlog() {
  
    const [blog, setBlog] = useState('')
    const [loading, setLoading] = useState(false)

    const {id} = useParams()

    const backend_url = import.meta.env.VITE_BACKEND_URL

    const fetchBlog = async() =>{
        try {            
            const blogResponse = await fetch(`${backend_url}/blog/${id}`,{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            const data = await blogResponse.json()
            setBlog(data)

            
        } catch (error) {
            console.error("This is error of Update blog API", error);
        }
    }


    const handleSave = async(e) =>{

        e.preventDefault()
        
        setLoading(true)

        try {
            const formData = new FormData()
            formData.append('image', blog.image)
    
            const image = await fetch(`${backend_url}/upload`,{
                method: 'POST',
                body: formData 
            })
    
            const imageResponse = await image.json()
            const imageResult = imageResponse.image_url
    
    
            const updateResponse = await fetch(`${backend_url}/updateblog`, {
                method: 'PUT',
                headers:{
                    'Content-Type' :'application/json'
                },
                body: JSON.stringify({...blog, image: imageResult})
            })
    
            const resultResponse = await updateResponse.json()
            setBlog(resultResponse) 
            
            Modal.success({
                content: "Blog updated successfully",
            });

        } catch (error) {
            console.error("This is error", error);
        }finally{
            setLoading(false)
        }



    }


    useEffect(() => {
        fetchBlog()
    }, [id])


return (
    <>
        <div className="w-full max-w-6xl h-[100vh] mx-auto py-8">
            <h1 className="text-2xl font-bold text-[#2F3542] mb-6 text-center">Edit Blog </h1>
            
            <form id="addBlogForm" className="space-y-4 px-8" onSubmit={handleSave} >

            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-600">Title</label>
                <input
                type="text"
                id="title"
                name="title"
                value={blog.title}
                placeholder="Enter blog title"
                onChange={(e)=>setBlog({ ...blog, title:e.target.value })}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400"
                required
                />
            </div>

            <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-600">Banner Image</label>
                <input
                type="file"
                id="image"
                name="image"
                onChange={(e)=>setBlog({ ...blog, image:e.target.files[0] })}
                className="w-full  px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400"
                
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
                <textarea
                id="description"
                name="description"
                rows="16"
                placeholder="Enter blog description"
                value={blog.description}
                onChange={(e)=>setBlog({ ...blog, description:e.target.value })}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400"
                required
                ></textarea>
            </div>

            <button className="w-full bg-[#FF4757] text-white py-2 rounded-md hover:bg-[#E63946] transition duration-300">
               {loading ? <Loader/> : "Update Blog"}
            </button>
            
            </form>
        </div>
    </>
  )
}

export default UpdateBlog