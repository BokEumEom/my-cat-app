// src/components/CatBreedList.jsx
import React from "react";
import CatBreedCard from "./CatBreedCard";
import styles from "../styles/CatBreedList.module.css";

function CatBreedList({ breeds }) {
  if (!breeds || breeds.length === 0) {
    return <p className={styles.noData}>데이터가 없습니다.</p>;
  }

  return (
    <div className={styles.grid}>
      {breeds.map((breed) => (
        <CatBreedCard key={breed.id} breed={breed} />
      ))}
    </div>
  );
}

export default CatBreedList;
