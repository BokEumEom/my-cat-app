import { useState } from "react";
import { useFetchBreeds, useFetchPopularBreeds } from "../hooks/useFetchBreeds";
import { useSearch } from "../hooks/useSearch";
import { useNavigate } from "react-router-dom"; // 🔹 BreedPage로 이동을 위한 useNavigate 추가
import { MagnifyingGlassIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import CatBreedList from "../components/CatBreedList";
import Loader from "../components/common/Loader";
import styles from "../styles/HomePage.module.css";

function HomePage() {
  const { data: breeds, loading, error } = useFetchBreeds(); // 전체 품종 가져오기
  const { data: popularBreeds } = useFetchPopularBreeds(); // 인기 품종 가져오기
  const { query, setQuery, filteredItems } = useSearch(breeds, (breed, query) =>
    breed.name.toLowerCase().includes(query.toLowerCase())
  );
  const [visibleBreeds, setVisibleBreeds] = useState(6);
  const navigate = useNavigate(); // 🔹 페이지 이동을 위한 useNavigate 훅

  return (
    <div className={styles.container}>
      {/* 랜덤 배너 */}
      <Banner />

      {/* 인기 품종 (5개) */}
      <section className={styles.popularSection}>
        <h2>🏆 인기 고양이</h2>
        <div className={styles.popularList}>
          {popularBreeds?.map((breed) => (
            <div 
              key={breed.id} 
              className={styles.popularItem} 
              onClick={() => navigate(`/breed/${breed.id}`)} // 🔹 클릭 시 BreedPage 이동
            >
              <img 
                src={breed.image?.url} 
                alt={breed.name} 
                className={styles.popularImage} 
              />
              <p>{breed.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 검색창 */}
      <div className={styles.searchWrapper}>
        <SearchBar query={query} setQuery={setQuery} />
        <MagnifyingGlassIcon className={styles.searchIcon} />
      </div>

      {/* 로딩 상태 */}
      {loading && <Loader />}
      {error && <p className={styles.errorText}>{error}</p>}

      {/* 검색 결과 or 전체 품종 리스트 */}
      <CatBreedList breeds={query ? filteredItems : breeds?.slice(0, visibleBreeds)} />

      {/* 더보기 버튼 */}
      {!query && breeds && visibleBreeds < breeds.length && (
        <button className={styles.loadMoreBtn} onClick={() => setVisibleBreeds(visibleBreeds + 6)}>
          더보기 <ChevronDownIcon className={styles.loadMoreIcon} />
        </button>
      )}
    </div>
  );
}

export default HomePage;
