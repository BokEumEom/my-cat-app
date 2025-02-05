// src/components/BasicKnowledgeModal.jsx
import { useEffect, useRef } from "react";
import styles from "../styles/BasicKnowledgeModal.module.css";

function BasicKnowledgeModal({ item, onClose }) {
  const closeButtonRef = useRef(null);

  // 모달이 열리면 닫기 버튼으로 포커스 이동 (접근성 개선)
  useEffect(() => {
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, []);

  if (!item) return null;

  return (
    <div
      className={`${styles.modalOverlay} ${styles.show}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          className={styles.modalClose}
          onClick={onClose}
          aria-label="모달 닫기"
        >
          &times;
        </button>
        {/* 상세 이미지가 있으면 모달 상단에 표시 */}
        {item.detailImage && (
          <div
            className={styles.modalImage}
            style={{ backgroundImage: `url(${item.detailImage})` }}
          />
        )}
        <h2 className={styles.modalTitle}>{item.title}</h2>
        {item.type === "paragraph" ? (
          <p className={styles.modalText}>{item.content}</p>
        ) : item.type === "list" ? (
          <ul className={styles.modalList}>
            {item.content.map((it, idx) => (
              <li key={idx}>{it}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default BasicKnowledgeModal;
