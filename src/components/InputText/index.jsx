import React, { useState } from "react";
import "./index.css";

function InputText({ className, onChange, value, placeholder, maxLength }) {
  const [focus, setFocus] = useState(false);

  const inputStyles = {
    inputFocus: {
      boxShadow: "0px 0px 2px 3px rgba(155, 74, 231, 0.292)",
      border: "none",
      transition: "300ms",
    },
    inputBlur: {
      boxShadow: "none",
      border: "none",
    },
  };

  return (
    <>
      <input
        style={focus === true ? inputStyles.inputFocus : inputStyles.inputBlur}
        type="text"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={className}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </>
  );
}

export default InputText;
