// src/components/CatBreedCard.jsx
import { useNavigate } from "react-router-dom";
import styles from "../styles/CatBreedCard.module.css";

function CatBreedCard({ breed }) {
  const navigate = useNavigate();

  return (
    <div className={styles.card} onClick={() => navigate(`/breed/${breed.id}`)}>
      {breed.image?.url ? (
        <img src={breed.image.url} alt={breed.name} className={styles.image} />
      ) : (
        <div className={styles.noImage}>이미지 없음</div>
      )}
      <div className={styles.content}>
        <h3 className={styles.name}>{breed.name}</h3>
        <p className={styles.temperament}>{breed.temperament}</p>
        <span className={styles.origin}>{breed.origin}</span>
      </div>
    </div>
  );
}

export default CatBreedCard;
