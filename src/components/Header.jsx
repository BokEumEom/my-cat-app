import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import styles from "../styles/Header.module.css";

function Header() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* 로고 클릭 시 홈으로 이동 */}
      <h1 className={styles.logo}>
        <Link to="/">Cats See</Link>
      </h1>

      {/* 모바일 햄버거 메뉴 버튼 */}
      <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* 네비게이션 메뉴 */}
      <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          ⭐ My Cat
        </NavLink>
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </nav>
    </header>
  );
}

export default Header;
