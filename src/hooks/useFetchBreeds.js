import { useQuery } from "@tanstack/react-query";
import { getCatBreeds, getCatBreedById } from "../api/catApi";

/**
 * 🐱 고양이 품종 데이터를 가져오는 Custom Hook (React Query 적용)
 * 
 * @param {string} [id] - 특정 품종 ID (없으면 전체 목록 가져옴)
 */
export function useFetchBreeds(id) {
  const {
    data: breeds = [],
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: id ? ["catBreed", id] : ["catBreeds"], // 품종 ID 여부에 따라 키 변경
    queryFn: () => (id ? getCatBreedById(id) : getCatBreeds()), // 조건에 따라 API 호출 변경
    enabled: id !== undefined || id !== null, // id가 있을 때만 실행 (undefined 방지)
    staleTime: 1000 * 60 * 10, // 10분 동안 데이터 캐싱 유지
    retry: 2, // 네트워크 오류 발생 시 2번 재시도
  });

  return { data: breeds, loading, error: isError ? error.message : null };
}

export function useFetchPopularBreeds() {
  return useQuery({
    queryKey: ["popularBreeds"],
    queryFn: async () => {
      const allBreeds = await getCatBreeds();
      return allBreeds
        .sort((a, b) => (b.affection_level + b.grooming) - (a.affection_level + a.grooming)) // 애정도 + 관리 편리함 점수로 정렬
        .slice(0, 5); // 상위 5개 선택
    },
    staleTime: 1000 * 60 * 10,
    select: (data) => data ?? [],
  });
}
