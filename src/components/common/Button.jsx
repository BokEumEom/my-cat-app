// src/components/common/Button.jsx
import React from "react";

function Button({ onClick, children, style }) {
  return (
    <button onClick={onClick} style={style} className="button">
      {children}
    </button>
  );
}

export default Button;
