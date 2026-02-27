import React, { useState } from "react";
import { Link } from "react-router-dom";
import axois from 'axios'
import { toast } from "react-toast";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChnage = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // console.log(form);
  }
  const handleSumbit = async (e) => {
    e.preventDefault();
     
    const user={
      username:form.username,
      email:form.email,
      password:form.password
    }
    console.log(user);

    try {
      const res= await axois.post('http://localhost:3000/api/auth/register',user,{
       withCredentials:true
      })
      
     console.log(res);
     setForm(res.data)
     toast.success('user register successfully')

    } catch (error) {
      console.log(error);
      
    }
    

  };

  

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSumbit}>
          <input type="text" name="username" placeholder="username" onChange={handleChnage} required />
          <input type="email" name="email" placeholder="email" onChange={handleChnage}  required />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChnage} 
            required
          />
          <button>Register</button>
        </form>
        <p>
          Already have a account?{" "}
          <Link className="toogle-authform" to="/login">
            Login
          </Link>{" "}
        </p>
      </div>
    </main>
  );
};

export default Register;
