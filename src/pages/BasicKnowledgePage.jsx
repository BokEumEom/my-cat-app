// src/pages/BasicKnowledgePage.jsx
import { useState } from "react";
import basicKnowledgeData from "../data/basicKnowledgeData";
import BasicKnowledgeModal from "../components/BasicKnowledgeModal";
import FloatingMenu from "../components/FloatingMenu";
import styles from "../styles/BasicKnowledgePage.module.css";

const MAX_SNIPPET_LENGTH = 100;

function truncateText(text, maxLength = MAX_SNIPPET_LENGTH) {
  return text.length > maxLength ? text.slice(0, maxLength) + " ..." : text;
}

function BasicKnowledgePage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = basicKnowledgeData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>기본 상식</h1>
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
                <span className={styles.moreIndicator}>자세히 보기 &rarr;</span>
              </p>
            </div>
          );
        })}
      </div>
      {selectedItem && (
        <BasicKnowledgeModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* 플로팅 메뉴 추가 */}
      <FloatingMenu />
    </div>
  );
}

export default BasicKnowledgePage;
