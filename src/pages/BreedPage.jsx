import { useParams, useNavigate } from "react-router-dom";
import { useFetchBreeds } from "../hooks/useFetchBreeds";
import Loader from "../components/common/Loader";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import styles from "../styles/BreedPage.module.css";

function BreedPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: breed, loading, error } = useFetchBreeds(id); // 특정 품종 정보 가져오기

  if (loading) return <Loader />;
  if (error)
    return (
      <div className={styles.errorContainer}>
        <ExclamationTriangleIcon className={styles.errorIcon} />
        <p className={styles.errorText}>{error}</p>
        <button onClick={() => window.location.reload()} className={styles.retryButton}>
          재시도
        </button>
      </div>
    );
  if (!breed)
    return <p className={styles.errorText}>품종 정보를 찾을 수 없습니다</p>;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backButton} aria-label="이전 페이지로 이동">
        ←
      </button>

      <a href="#description" className={styles.skipLink}>
        설명 섹션으로 건너뛰기
      </a>

      <h1 className={styles.title}>{breed.name}</h1>

      <div className={styles.imageWrapper}>
        {breed.image?.url ? (
          <img src={breed.image.url} alt={`${breed.name} 고양이`} className={styles.image} />
        ) : (
          <div className={styles.noImage}>이미지를 불러올 수 없습니다.</div>
        )}
      </div>

      <p className={styles.info}>
        <strong>출신:</strong> {breed.origin}
      </p>
      <p className={styles.info}>
        <strong>성격:</strong> {breed.temperament}
      </p>

      <div className={styles.ratingChart} id="description">
        <h2>특성</h2>
        {["친화력", "활동성", "털 관리"].map((label) => (
          <div key={label} className={styles.ratingBar}>
            <span>{label}</span>
            <div className={styles.barContainer}>
              <div className={styles.barFill} style={{ width: `${breed[label.toLowerCase()] * 20}%` }} />
            </div>
          </div>
        ))}
      </div>

      <p className={styles.description}>{breed.description}</p>
    </div>
  );
}

export default BreedPage;
