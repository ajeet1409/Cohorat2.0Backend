import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

import "../style/login.scss";
import FormGroup from "../components/FormGroup";
import{ useNavigate} from "react-router-dom";

import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth.js";

const Login = () => {
  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth();

  const [formData, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    // const {name ,value} = e.target
    setForm({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    console.log(userData);

    // **handlelogin call api
     await  handleLogin(userData);

    // alert("user login successfully");
    toast.success("user login successfully")
    navigate("/");
  };

  if (loading) return <div className="login-page">loading ...</div>;

  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="email"
            placeholder="Enter your email or username"
            onChange={handleChange}
            value={formData.email}
          />
          <FormGroup
            label="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={formData.password}
          />

          <button className="button primary-button">Login</button>
        </form>
        <p>
          Don't have an account ? <Link to="/register">Register here</Link>{" "}
        </p>
      </div>
    </main>
  );
};

export default Login;
