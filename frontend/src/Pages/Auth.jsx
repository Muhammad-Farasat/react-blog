import React, { useState } from "react";
import { Button, Modal, Space } from 'antd';

function Auth() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  }) 


  const change = (e) =>{
    setFormData({
        ...formData, [e.target.name]:e.target.value
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(formData);
  }

  const backend_url = import.meta.env.VITE_BACKEND_URL

  const signup = async(e) =>{
    e.preventDefault()

    const signupResponse = await fetch(`${backend_url}/signup`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    const response = await signupResponse.json()
    localStorage.setItem("auth-token", response.token);

    const error = (value) => {
      Modal.error({
        content: value,
      });
    }

    if (response.success) {
      window.location.replace('/')
      localStorage.setItem("auth-token", response.token);
      console.log(response);
    }else if(response.error==='Fill all feild..!') {
      error('Fill all field')
      console.log("Login failed:", response.error);
    }else{
      error('Something went wrong')
    }



  }

  const login = async(e) => {
    e.preventDefault()
    const logResponse = await fetch(`${backend_url}/login`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: formData.email,
            password: formData.password
        })
    }) 

    const response = await logResponse.json()
    const token = localStorage.setItem('auth-token',response.token)
    console.log(response, token);

    const error = (value) => {
      Modal.error({
        content: value,
      });
    }

    
    if (logResponse.status === 200) {
      console.log("Login successful:", response);
      window.location.replace('/')
      localStorage.setItem("auth-token", response.token);
  
    } else if(response.error==='Incorrect password.') {
      error('Incorrect Password!')
      console.log("Login failed:", response.error);
    } else if(response.error==='fill all feild..!') {
      error('Fill all field')
      console.log("Login failed:", response.error);
    }else{
      error('Something went wrong')
    }


  }



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
          {isLogin ? "Login" : "Signup"}
        </h2>

        <form className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
              onChange={change}
              value={formData.username}
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={change}
              value={formData.email}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={change}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-300 focus:border-green-400 focus:outline-none "
              required
            />
          </div>

          <button
            className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition duration-300"
            onClick={(e)=> {isLogin==true ? login(e) : signup(e)}}            
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-700 font-semibold cursor-pointer hover:underline"
          >
            {isLogin ? "Signup" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
