import React, { useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../hook/useAuth.js";
const Register = () => {
  const { loading, handleRegister } = useAuth();
  const [form, setform] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: form.username,
      email: form.email,

      password: form.password,
    };

    // call api to register
    const res = await handleRegister(user);
    console.log(res)
  };
  if (loading) {
    return <h1>Loadinging...</h1>;
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            placeholder="Enter a name"
            name="username"
            type="text"
          />
          <input
            onChange={handleChange}
            placeholder="Enter a email"
            name="email"
            type="email"
          />
          <input
            onChange={handleChange}
            placeholder="Enter a password"
            name="password"
            type="password"
          />
          <button className="button primary-button ">Register</button>
        </form>
        <p>
          Alreay have a account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
