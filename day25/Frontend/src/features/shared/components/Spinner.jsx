import React from "react";
import "../style/spinner.scss";

const Spinner = ({ size = "md", label = "Loading..." }) => {
  return (
    <div className={`spinner spinner--${size}`}>
      <div className="spinner__ring"></div>
      {label && <p className="spinner__label">{label}</p>}
    </div>
  );
};

export default Spinner;
