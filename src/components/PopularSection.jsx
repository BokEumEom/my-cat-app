import { useNavigate } from "react-router-dom";
import styles from "../styles/PopularSection.module.css";

function PopularSection({ popularBreeds }) {
  const navigate = useNavigate();

  return (
    <section className={styles.popularSection}>
      <h2 className={styles.title}>🐾 인기 고양이</h2>
      <div className={styles.popularList}>
        {popularBreeds?.map((breed) => (
          <div
            key={breed.id}
            className={styles.popularItem}
            onClick={() => navigate(`/breed/${breed.id}`)}
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
  );
}

export default PopularSection;
