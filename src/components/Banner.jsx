import { useFetchRandomCat } from "../hooks/useFetchRandomCat";
import styles from "../styles/Banner.module.css";

function Banner() {
  const { data: image, isLoading, error } = useFetchRandomCat();

  return (
    <div className={styles.banner}>
      {isLoading && <p className={styles.loadingText}>이미지 불러오는 중...</p>}
      {error && <p className={styles.errorText}>이미지를 불러오지 못했습니다.</p>}
      {image && <img src={image} alt="Random Cat" className={styles.image} />}
    </div>
  );
}

export default Banner;
