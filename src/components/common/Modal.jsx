import { useEffect } from "react";
import styles from "../../styles/Modal.module.css";

function Modal({ title, message, onConfirm, onCancel }) {
  // ESC 키로 모달 닫기 기능
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalMessage}>{message}</p>
        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onCancel}>
            취소
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
