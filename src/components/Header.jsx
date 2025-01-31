// src/components/Header.jsx
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import styles from "../styles/Header.module.css";

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link to="/">🐱 Cat Info</Link>
      </h1>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>🏠 홈</Link>
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </nav>
    </header>
  );
}

export default Header;
