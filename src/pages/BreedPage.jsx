// src/pages/BreedPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCatBreedById } from "../api/catApi";
import Loader from "../components/common/Loader";
import styles from "../styles/BreedPage.module.css";

function BreedPage() {
  const { id } = useParams(); // URL에서 품종 ID 가져오기
  const [breed, setBreed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBreed() {
      try {
        setLoading(true);
        const data = await getCatBreedById(id);
        if (!data) throw new Error("데이터를 찾을 수 없습니다.");
        setBreed(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBreed();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p className={styles.errorText}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{breed.name}</h1>

      {/* 이미지 표시: 대체 이미지 적용 */}
      <div className={styles.imageWrapper}>
        {breed.image?.url ? (
          <img src={breed.image.url} alt={breed.name} className={styles.image} />
        ) : (
          <div className={styles.noImage}>이미지를 불러올 수 없습니다.</div>
        )}
      </div>

      <p className={styles.info}><strong>출신:</strong> {breed.origin}</p>
      <p className={styles.info}><strong>성격:</strong> {breed.temperament}</p>
      <p className={styles.description}>{breed.description}</p>
    </div>
  );
}

export default BreedPage;
