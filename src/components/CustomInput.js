import React from "react";

const CustomInput = ({ label, value, setValue, type = "text" }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        style={{ width: "100%" }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default CustomInput;
