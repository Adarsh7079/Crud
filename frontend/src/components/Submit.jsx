import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';


const Submit = () => {
  const navigate = useNavigate();
 
  const [formData,setFormData]=useState({
    name:"",
    email:""
  })
  const handleSubmit = async (e) => {
    console.log("data get", formData);
    e.preventDefault();

    try {
      const users = await axios.post(
        "http://localhost:4000/api/v1/register",
        formData,
        {
          withCredentials:true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data;
      console.log("user found", users);
      if (users.status == 200) {
        window.alert("form Submitted");
        formData.name="";
        formData.email="";

        navigate("/all")
        
      } else {
        window.alert("Something Went Wrong !");
        console.log("error occur", data);
      }
    } catch (error) {
      window.alert("Something Went Wrong !");
      console.log("Login error ", error);
    }
  };
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((e) => {
      return { ...e, [name]: value };
    });
    console.log("formadat", formData);
  };
  return (
    <div className=' w-full text-red-300'>
    <form action="" onSubmit={handleSubmit} className=' flex items-center justify-center mt-20'>
      <div className=' w-[400px] border-2 border-gray-600 rounded-md p-10'>
        <h className='text-5xl font-bold text-gray-500 underline'>Form</h>
      <div className='flex flex-col gap-7 py-12'>
          <input type="text" placeholder='enter name '
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInput}
          className=" border-2 h-[40px] border-gray-400 px-3 rounded-md " />

          <input type="email" placeholder='adarsh@gmail.com '
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInput} 
          className=" border-2 border-gray-400 h-[40px] px-3 rounded-md"/>
       </div>
       <button className="w-full bg-orange-400 h-[45px] rounded-md hover:bg-orange-500 text-white">
                Register
              </button>
      </div>
    </form>
  </div>
  )
}

export default Submit