// src/hooks/useFetchBreeds.js
import { useState, useEffect } from "react";
import { getCatBreeds } from "../api/catApi";

/**
 * 🐱 고양이 품종 데이터를 가져오는 Custom Hook
 */
export function useFetchBreeds() {
  const [breeds, setBreeds] = useState([]); // 품종 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태

  useEffect(() => {
    async function fetchBreeds() {
      try {
        setLoading(true);
        const data = await getCatBreeds();
        if (!data.length) throw new Error("데이터가 없습니다.");
        setBreeds(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBreeds();
  }, []);

  return { breeds, loading, error };
}
