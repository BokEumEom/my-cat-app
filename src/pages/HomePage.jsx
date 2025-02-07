import { useState } from "react";
import { useFetchBreeds, useFetchPopularBreeds } from "../hooks/useFetchBreeds";
import { useSearch } from "../hooks/useSearch";
import { MagnifyingGlassIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import Header from "../components/Header";
import Banner from "../components/Banner";
import PopularSection from "../components/PopularSection";
import SearchBar from "../components/SearchBar";
import CatBreedList from "../components/CatBreedList";
import Loader from "../components/common/Loader";
import FloatingMenu from "../components/FloatingMenu";
import styles from "../styles/HomePage.module.css";

function HomePage() {
  const { data: breeds, loading, error } = useFetchBreeds(); // 전체 품종 가져오기
  const { data: popularBreeds } = useFetchPopularBreeds(); // 인기 품종 가져오기
  const { query, setQuery, filteredItems } = useSearch(breeds, (breed, query) =>
    breed.name.toLowerCase().includes(query.toLowerCase())
  );
  const [visibleBreeds, setVisibleBreeds] = useState(6);

  return (
    <div className={styles.container}>
      {/* 헤더 컴포넌트 추가 */}
      <Header />

      {/* 랜덤 배너 */}
      <Banner />

      {/* 인기 품종 섹션 (컴포넌트 분리) */}
      <PopularSection popularBreeds={popularBreeds} />

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

      {/* 플로팅 메뉴 추가 */}
      <FloatingMenu />
    </div>
  );
}

export default HomePage;
