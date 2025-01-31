// src/pages/HomePage.jsx
import React from "react";
import { useFetchBreeds } from "../hooks/useFetchBreeds";
import SearchBar from "../components/SearchBar";
import CatBreedList from "../components/CatBreedList";
import Loader from "../components/common/Loader";
import styles from "../styles/HomePage.module.css";

function HomePage() {
  const { breeds, loading, error } = useFetchBreeds();
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <header className={styles.header}>
        <h1 className={styles.title}>🐱 Cat Info</h1>
        <button className={styles.darkModeBtn} onClick={() => alert("다크 모드 추가 예정!")}>
          🌙 다크 모드
        </button>
      </header>

      {/* 검색창 */}
      <div className={styles.searchContainer}>
        <SearchBar query={searchQuery} setQuery={setSearchQuery} />
      </div>

      {/* 로딩 상태 */}
      {loading && <Loader />}
      {error && <p className={styles.errorText}>{error}</p>}

      {/* 인기 품종 가로 스크롤 */}
      <section className={styles.popularSection}>
        <h2>🏆 인기 품종</h2>
        <div className={styles.popularList}>
          {breeds.slice(0, 5).map((breed) => (
            <div key={breed.id} className={styles.popularCard}>
              <img src={breed.image?.url} alt={breed.name} className={styles.popularImage} />
              <p>{breed.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 전체 품종 리스트 */}
      <section className={styles.breedSection}>
        <h2>🐱 모든 품종</h2>
        <CatBreedList breeds={filteredBreeds} />
      </section>

      {/* 푸터 */}
      <footer className={styles.footer}>
        ⓒ 2025 Cat Info - 모든 권리 보유
      </footer>
    </div>
  );
}

export default HomePage;
