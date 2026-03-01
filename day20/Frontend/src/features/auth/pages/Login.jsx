import React, { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate()
  const {user, loading, handleLogin } = useAuth();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    // call api
   await handleLogin(user);
    
    // alert("login successfully");
    navigate('/')
  };
  
  if (loading) {
    return (
      <div>
        <h1>Lading.....</h1>
      </div>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="enter a username"
            onInput={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            name="password"
            placeholder="enter a password"
            onInput={(e) => setPassword(e.target.value)}
            required
          />
          <button className="button primary-button  ">Login</button>
        </form>
        <p>
          Don't have a account ? <Link to="/register">Create One.</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
