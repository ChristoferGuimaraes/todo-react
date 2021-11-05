import React, { useState } from "react";
import "./index.css";

function InputText({ className, onChange, value, placeholder, maxLength }) {
  const [focus, setFocus] = useState(false);

  const onFocusStyle = {
    inputFocus: {
      boxShadow: "0px 0px 3px rgba(71, 23, 116, 0.792)",
      border: "1px solid rgba(93, 28, 153, 0.518)",
    },
  };
  const onBlurStyle = {
    inputBlur: {
      boxShadow: "none",
      border: "1px solid black",
    },
  };

  return (
    <>
      <input
        style={focus === true ? onFocusStyle.inputFocus : onBlurStyle.inputBlur}
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
