import React from "react";

const FormGroup = ({ label, placeholder, onChange, value }) => {
    console.log(value)
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input
        type={label}
        id={label}
        name={label}
        placeholder={placeholder}

        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default FormGroup;
