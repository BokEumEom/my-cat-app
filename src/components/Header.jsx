// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <h1><Link to="/">🐱 Cat Info</Link></h1>
      <nav>
        <Link to="/">홈</Link>
        <button onClick={toggleTheme}>
          {theme === "light" ? "🌙 다크 모드" : "☀️ 라이트 모드"}
        </button>
      </nav>
    </header>
  );
}

export default Header;
