import React from "react";
import "../nav.scss";
import { useNavigate } from "react-router";


const Nav = () => {
    const navigate = useNavigate()
  return (
    <nav className="nav-bar">
      <p>Insta</p>
      <button onClick={()=>navigate('/createPost')} className="button primary-button">new Post</button>
    </nav>
  );
};

export default Nav;
