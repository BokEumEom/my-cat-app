// src/hooks/useTheme.js
import { useState, useEffect } from "react";

/**
 * 🎨 다크/라이트 모드를 관리하는 Custom Hook
 */
export function useTheme() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return { theme, toggleTheme };
}
