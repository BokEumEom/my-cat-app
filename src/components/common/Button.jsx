// src/components/common/Button.jsx
function Button({ onClick, children, style }) {
  return (
    <button onClick={onClick} style={style} className="button">
      {children}
    </button>
  );
}

export default Button;
