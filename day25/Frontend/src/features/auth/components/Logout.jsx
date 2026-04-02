import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";


const Logout = () => {
  const navigate = useNavigate();
  const { handleLogout ,loading} = useAuth();

  if(loading) return <h1>loading............</h1>
  
    const logout = async () => {
      console.log('hello')
      const isLogout = await handleLogout();
      if (isLogout) {
        navigate("/login");
      }
    };
 

  return (
    <div className="logout ">
      <button className="button secondary-button"onClick={logout} >
        Logout
      </button>
    </div>
  );
};

export default Logout;
