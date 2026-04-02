import React from "react";
import "../style/card.scss";

const Card = ({ children, className = "", onClick, elevated = false, padding = "lg" }) => {
  return (
    <div
      className={`card card--${padding} ${elevated ? "card--elevated" : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
