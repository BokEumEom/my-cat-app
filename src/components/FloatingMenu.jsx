// src/components/FloatingMenu.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  StarIcon,
  InformationCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid"; // 필요한 아이콘들 임포트
import styles from "../styles/FloatingMenu.module.css";

function FloatingMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className={styles.floatingMenuContainer}>
      {/* 항상 렌더링한 후 menuOpen에 따라 CSS 애니메이션 적용 */}
      <div className={`${styles.menuOptions} ${menuOpen ? styles.open : ""}`}>
        <button
          className={styles.menuOptionBtn}
          onClick={() => handleNavigate("/")}
        >
          <HomeIcon className={styles.menuOptionIcon} />
          <span>홈</span>
        </button>
        <button
          className={styles.menuOptionBtn}
          onClick={() => handleNavigate("/favorites")}
        >
          <StarIcon className={styles.menuOptionIcon} />
          <span>즐겨찾기</span>
        </button>
        <button
          className={styles.menuOptionBtn}
          onClick={() => handleNavigate("/basic-knowledge")}
        >
          <InformationCircleIcon className={styles.menuOptionIcon} />
          <span>기본상식</span>
        </button>
      </div>
      <button
        className={styles.floatingButton}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="네비게이션 메뉴 열기"
        type="button"
      >
        {menuOpen ? (
          <XMarkIcon className={styles.floatingIcon} />
        ) : (
          <Bars3Icon className={styles.floatingIcon} />
        )}
      </button>
    </div>
  );
}

export default FloatingMenu;
