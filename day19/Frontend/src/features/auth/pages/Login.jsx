import React, { useState } from "react";
import "../style/form.scss";
import { Link, useNavigate } from "react-router-dom";

// import { login } from "../services/auth.api";
import { useAuth } from "../hook/useAuth.js";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin, loading, user } = useAuth();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  console.log(user);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  console.log(username, password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    // api call for login

    handleLogin(user).then((res) => {
      console.log(res);
    });

    navigate("/");
  };

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            placeholder="Enter username"
            required
          />
          {/* <input type="email" name='emial' placeholder='Email'  required/> */}
          <input
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="password"
            required
          />
          <button>Login</button>
        </form>
        <p>
          Dont't have a account?{" "}
          <Link className="toogle-authform" to="/register">
            Register
          </Link>{" "}
        </p>
      </div>
    </main>
  );
};

export default Login;
