import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid"; // 트래시 아이콘
import { useFavourites } from "../hooks/useFavourites";
import Loader from "../components/common/Loader";
import Modal from "../components/common/Modal"; // 공통 모달 컴포넌트 활용
import FloatingMenu from "../components/FloatingMenu";
import styles from "../styles/FavoritesPage.module.css";

function FavoritesPage() {
  const { favourites, isLoading, error, removeFavourite } = useFavourites();
  const [removingId, setRemovingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleRemove = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmRemove = () => {
    setRemovingId(selectedId);
    removeFavourite(selectedId);
    setShowModal(false);
  };

  if (isLoading) return <Loader />;
  if (error)
    return (
      <p className={styles.errorText}>
        즐겨찾기 데이터를 불러오는 중 오류 발생: {error.message}
      </p>
    );

  return (
    <div className={styles.container}>
      <h1>My Favourite Cats</h1>
      <div className={styles.favouritesGrid}>
        {favourites.length > 0 ? (
          favourites.map((fav) => (
            <div
              key={fav.id}
              className={`${styles.favouriteItem} ${
                removingId === fav.id ? styles.fadeOut : ""
              }`}
            >
              <img
                src={fav.image?.url}
                alt="Favourite Cat"
                className={`${styles.favouriteImage} ${isLoading ? styles.loading : ""}`}
                loading="lazy"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(fav.id);
                }}
                className={`${styles.removeButton} ${
                  removingId === fav.id ? styles.removing : ""
                }`}
                aria-label="Remove Favourite"
                title="Remove Favourite"
              >
                <TrashIcon className={styles.trashIcon} />
              </button>
            </div>
          ))
        ) : (
          <p className={styles.noFavourites}>No favourites yet.</p>
        )}
      </div>

      {/* 삭제 확인 모달 */}
      {showModal && (
        <Modal
          title="즐겨찾기 삭제"
          message="이 항목을 삭제하시겠습니까?"
          onConfirm={confirmRemove}
          onCancel={() => setShowModal(false)}
        />
      )}

      {/* 플로팅 메뉴 추가 */}
      <FloatingMenu />
    </div>
  );
}

export default FavoritesPage;
