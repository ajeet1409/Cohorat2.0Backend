import React, { useState } from "react";
import "../style/register.scss";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { loading, handleRegister } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    //*register for this function
   await handleRegister(userData);

    console.log(userData);
    navigate("/login");
  };

  if (loading) return <div className="register-page">Loading to register</div>;

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="username"
            placeholder="Enter a username"
            onChange={handleChange}
            value={formData.username}
          />
          <FormGroup
            label="email"
            placeholder="Enter a email"
            onChange={handleChange}
            value={formData.email}
          />
          <FormGroup
            label="password"
            placeholder="Enter a password"
            onChange={handleChange}
            value={formData.password}
          />
        <button className="button primary-button">Register</button>
        </form>
        <p>
          Already have an account ?<Link to="login">Login here</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
