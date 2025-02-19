import React from "react";
import { useNavigate } from "react-router-dom";

function Card(props) {

  const truncateDescription = (text, limit) =>{
    return text.length > limit ? text.slice(0, limit) + '...' : text
  }

  const navigate = useNavigate()

  const backend_url = import.meta.env.VITE_BACKEND_URL

  const nav = (id) =>{
    navigate(`/api/blog/${id}`)
  }

  return (
    <>
      <div className="bg-white shadow-md rounded overflow-hidden">
        <img
          src={props.image}
          alt="Blog Image"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h4 className="text-xl font-semibold text-[#2F3542]"> {props.title} </h4>
          <p className="text-gray-600 mt-2">
            {truncateDescription(props.description, 160)}
          </p>
          <button className="mt-4 text-[#FF4757] font-semibold hover:underline" onClick={()=>nav(props.id)}>
            Read More
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
