// src/pages/HomePage.jsx
import { useState } from "react";
import { useFetchBreeds } from "../hooks/useFetchBreeds";
import { useSearch } from "../hooks/useSearch";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import CatBreedList from "../components/CatBreedList";
import Loader from "../components/common/Loader";
import styles from "../styles/HomePage.module.css";

function HomePage() {
  const { breeds, loading, error } = useFetchBreeds();
  const { query, setQuery, filteredItems } = useSearch(breeds, (breed, query) =>
    breed.name.toLowerCase().includes(query)
  );
  const [visibleBreeds, setVisibleBreeds] = useState(6);

  return (
    <div className={styles.container}>
      {/* 랜덤 배너 */}
      <Banner />

      {/* 인기 품종 (5개) */}
      <section className={styles.popularSection}>
        <h2>🏆 인기 품종</h2>
        <div className={styles.popularList}>
          {breeds.slice(0, 5).map((breed) => (
            <div key={breed.id} className={styles.popularItem}>
              <img src={breed.image?.url} alt={breed.name} className={styles.popularImage} />
              <p>{breed.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 검색창 */}
      <SearchBar query={query} setQuery={setQuery} />

      {/* 로딩 상태 */}
      {loading && <Loader />}
      {error && <p className={styles.errorText}>{error}</p>}

      {/* 검색 결과 or 전체 품종 리스트 */}
      <CatBreedList breeds={query ? filteredItems : breeds.slice(0, visibleBreeds)} />

      {/* 더보기 버튼 */}
      {!query && visibleBreeds < breeds.length && (
        <button className={styles.loadMoreBtn} onClick={() => setVisibleBreeds(visibleBreeds + 6)}>
          더보기
        </button>
      )}
    </div>
  );
}

export default HomePage;
