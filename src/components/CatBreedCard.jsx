import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavourites } from "../hooks/useFavourites";
// outline 버전은 비워진 하트, solid 버전은 채워진 하트로 사용
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import styles from "../styles/CatBreedCard.module.css";

function CatBreedCard({ breed }) {
  const navigate = useNavigate();
  const { favourites, addFavourite, removeFavourite } = useFavourites();
  const [isTemperamentExpanded, setIsTemperamentExpanded] = useState(false);

  // 즐겨찾기 목록에서 현재 카드의 이미지 ID와 일치하는 항목 찾기
  const favRecord = favourites.find(
    (fav) => fav.image?.id === breed.image?.id
  );
  const isFavourited = Boolean(favRecord);

  // 즐겨찾기 버튼 클릭 시 처리 (카드 클릭 시 상세 페이지 이동 방지)
  const handleFavourite = (e) => {
    e.stopPropagation();
    if (isFavourited) {
      removeFavourite(favRecord.id);
    } else {
      if (breed.image?.id) {
        addFavourite(breed.image.id);
      } else {
        console.error("이미지 ID가 없어서 즐겨찾기를 추가할 수 없습니다.");
      }
    }
  };

  // temperament 텍스트가 길 경우 일정 길이까지만 보여주고 "자세히 보기" UI 추가
  const temperamentMaxLength = 100;
  const temperamentText = breed.temperament || "";
  const shouldTruncate = temperamentText.length > temperamentMaxLength;
  const displayedTemperament =
    !isTemperamentExpanded && shouldTruncate
      ? temperamentText.substring(0, temperamentMaxLength) + "..."
      : temperamentText;

  return (
    <div className={styles.card} onClick={() => navigate(`/breed/${breed.id}`)}>
      <div className={styles.imageContainer}>
        {breed.image?.url ? (
          <img src={breed.image.url} alt={breed.name} className={styles.image} />
        ) : (
          <div className={styles.noImage}>이미지 없음</div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{breed.name}</h3>
        <p className={styles.temperament}>
          {displayedTemperament}
          {shouldTruncate && !isTemperamentExpanded && (
            <span
              className={styles.readMore}
              onClick={(e) => {
                e.stopPropagation();
                setIsTemperamentExpanded(true);
              }}
            >
              자세히 보기
            </span>
          )}
        </p>
        <div className={styles.metaContainer}>
          <span className={styles.origin}>{breed.origin}</span>
          <button
            className={`${styles.favouriteButton} ${isFavourited ? styles.favourited : ""}`}
            onClick={handleFavourite}
            aria-label={isFavourited ? "즐겨찾기 삭제" : "즐겨찾기 추가"}
          >
            {isFavourited ? (
              <HeartIconSolid className={styles.favouriteIcon} />
            ) : (
              <HeartIconOutline className={styles.favouriteIcon} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CatBreedCard;
