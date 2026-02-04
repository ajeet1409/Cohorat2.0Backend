import React, { useState } from "react";
import API from "../Api";

const Form = () => {
  const [formdata, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  console.log(formdata);

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // e.preventDefault();

    const data = {
      username: formdata.username,
      email: formdata.email,
      password: formdata.password,
    };

    // console.log("data", data);
   try {
     const response = await API.post("/user/create", data,{
      headers:{
        "Content-Type":"application/json"
      }
     })
      console.log("form submitted", response.data)

       // OPTIONAL: clear form after success
    setFormData({
      username: "",
      email: "",
      password: "",
    });

   } catch (error) {
    console.log("error", error);
    
   }

   ;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className=" border-1xl border-gray-800 m-1 block px-4 py-2 outline-one"
          onChange={handleChange}
          placeholder="username"
          name="username"
          type="text"
        />
        <input
          className=" border-1xl m-1  border-gray-800 block px-4 py-2 outline-one"
          onChange={handleChange}
          placeholder="email"
          name="email"
          type="email"
        />
        <input
          className=" border-2xl m-1  border-gray-800 block px-4 py-2 outline-none"
          onChange={handleChange}
          placeholder="password"
          name="password"
          type="password"
        />
        <button className="px-3 py-2 rounded-1xl bg-emerald-300">Submit</button>
      </form>
    </div>
  );
};

export default Form;
