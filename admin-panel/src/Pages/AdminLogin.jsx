import React, { useEffect, useState } from "react";
import { Button, Modal, Space } from 'antd';



const AdminLogin = () => {

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const backend_url = import.meta.env.VITE_BACKEND_URL

  const adminLoginApi = async(e) =>{
    
    e.preventDefault()
    
    const login = await fetch(`${backend_url}/adminLogin`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })

    const data = await login.json()
    
    console.log(data);
    
    const error = (value) => {
      Modal.error({
        content: value,
      });
    }

    if (data.success) {
        window.location.replace('/admin')
        localStorage.setItem('auth-token', data.token)
    }
    else if(data.error==='Incorrect Credentials') {
      error('Incorrect Credentials')
      console.log("Login failed:", data.error);
    } 
    else if(data.error==='fill all feild..!') {
      error('Fill all field')
      console.log("Login failed:", data.error);
    }
    else{
      error('Something went wrong')
    }


    

    console.log(token);

  }


  return (
    <>
      <form onSubmit={adminLoginApi}>
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
              Admin Login
            </h2>
            {error && (
              <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
            )}
            <form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#FF4757] focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#FF4757] focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                className="w-full bg-[#FF4757] text-white py-2 rounded-md hover:bg-[#E63946] transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </form>
    </>
  );
};

export default AdminLogin;
