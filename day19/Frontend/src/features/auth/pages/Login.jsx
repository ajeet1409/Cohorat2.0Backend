import React, {useState} from "react";
import "../style/form.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toast";

const Login = () => {

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  console.log(username,password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user={
      username,
      password
    }
    // api call for login

    const res = await axios.post('http://localhost:3000/api/auth/login',user,{
      withCredentials:true
    })
    console.log(res);
    toast.success('user login successfully')
    
  }

  return (

    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
          onInput={(e)=>setUsername(e.target.value)}
            type="text"
            name="username"
            placeholder="Enter username"
            required
          />
          {/* <input type="email" name='emial' placeholder='Email'  required/> */}
          <input
          onInput={(e)=>setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="password"
            required
          />
          <button>Login</button>
        </form>
      <p>
       Dont't   have a account? <Link className='toogle-authform' to="/register">Register</Link>{" "}
      </p>
      </div>
    </main>
  );
};

export default Login;
