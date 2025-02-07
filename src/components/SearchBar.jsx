// src/components/SearchBar.jsx
import styles from "../styles/SearchBar.module.css";

function SearchBar({ query, setQuery }) {
  return (
    <input
      className={styles.searchBar}
      type="text"
      placeholder="🐱 고양이를 찾아보세요..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default SearchBar;
