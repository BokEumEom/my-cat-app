// src/components/SearchBar.jsx
import React from "react";
import styles from "../styles/SearchBar.module.css";

function SearchBar({ query, setQuery }) {
  return (
    <input
      className={styles.searchBar}
      type="text"
      placeholder="🐱 고양이 품종을 검색하세요..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default SearchBar;
