import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import styles from "../styles/Header.module.css";

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      {/* 로고 클릭 시 홈으로 이동 */}
      <h1 className={styles.logo}>
        <Link to="/">Cats See</Link>
      </h1>

      {/* 내비게이션 메뉴 (즐겨찾기 메뉴 제거) */}
      <nav className={styles.nav}>
        <button onClick={toggleTheme} className={styles.themeToggle} type="button">
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </nav>
    </header>
  );
}

export default Header;
