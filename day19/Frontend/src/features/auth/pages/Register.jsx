import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useAuth} from "../services/auth.api.js";

const Register = () => {
   const {handleRegister,loading}= useAuth()
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // console.log(form);
  };
  const handleSumbit = async (e) => {
    e.preventDefault();

    const user = {
      username: form.username,
      email: form.email,
      password: form.password,
    };
    console.log(user);

     if (loading) {
    return <h1>Loading...</h1>;
  }
// api call for register
    const res = await handleRegister(user)
    console.log(res);

    
  };

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSumbit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
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
