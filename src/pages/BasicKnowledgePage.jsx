// src/pages/BasicKnowledgePage.jsx
import { useState, useEffect, useRef } from "react";
import basicKnowledgeData from "../data/basicKnowledgeData";
import styles from "../styles/BasicKnowledgePage.module.css";

// 최대 미리보기 길이 (문자 수)
const MAX_SNIPPET_LENGTH = 100;

// 문자열을 최대 길이로 잘라 " ..." 추가하는 헬퍼 함수
function truncateText(text, maxLength = MAX_SNIPPET_LENGTH) {
  return text.length > maxLength ? text.slice(0, maxLength) + " ..." : text;
}

// 모달 컴포넌트 (접근성 및 애니메이션 개선)
function Modal({ item, onClose }) {
  const closeButtonRef = useRef(null);

  // 모달이 열리면 닫기 버튼에 포커스 이동 (접근성 개선)
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

function BasicKnowledgePage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 필터 기능: 입력값을 통해 제목에 포함된 항목만 보여줌
  const filteredData = basicKnowledgeData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>기본 상식</h1>

      {/* 검색 입력창 */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="검색하기..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
          aria-label="검색"
        />
      </div>

      <div className={styles.listContainer}>
        {filteredData.map((item) => {
          // 타입에 따라 미리보기 텍스트를 다르게 처리
          let snippet = "";
          if (item.type === "paragraph" && typeof item.content === "string") {
            const firstLine = item.content.split("\n")[0];
            snippet = truncateText(firstLine);
          } else if (item.type === "list" && Array.isArray(item.content)) {
            snippet = truncateText(item.content[0]);
          }

          return (
            <div
              key={item.id}
              className={styles.listItem}
              onClick={() => setSelectedItem(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedItem(item);
                }
              }}
            >
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemSnippet}>
                {snippet}{" "}
                <span className={styles.moreIndicator}>
                  자세히 보기 &rarr;
                </span>
              </p>
            </div>
          );
        })}
      </div>

      {selectedItem && (
        <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

export default BasicKnowledgePage;
