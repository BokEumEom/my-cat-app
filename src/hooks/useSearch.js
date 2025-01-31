// src/hooks/useSearch.js
import { useState } from "react";

/**
 * 🔍 검색 필터링을 위한 Custom Hook
 * @param {Array} items - 검색할 데이터 배열
 * @param {Function} filterFn - 필터링 함수
 * @returns {Object} - { query, setQuery, filteredItems }
 */
export function useSearch(items, filterFn) {
  const [query, setQuery] = useState(""); // 검색어 상태

  const filteredItems = items.filter((item) =>
    filterFn(item, query.toLowerCase())
  );

  return { query, setQuery, filteredItems };
}
