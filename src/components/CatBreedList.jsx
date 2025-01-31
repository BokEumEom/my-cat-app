// src/components/CatBreedList.jsx
import CatBreedCard from "./CatBreedCard";
import styles from "../styles/CatBreedList.module.css";

function CatBreedList({ breeds }) {
  if (!breeds || breeds.length === 0) {
    return <p className={styles.noData}>데이터가 없습니다.</p>;
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>🐾 고양이 품종 리스트</h2>
      <div className={styles.grid}>
        {breeds.map((breed) => (
          <CatBreedCard key={breed.id} breed={breed} />
        ))}
      </div>
    </section>
  );
}

export default CatBreedList;
