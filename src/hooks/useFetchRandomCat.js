import { useQuery } from "@tanstack/react-query";

/**
 * 🐱 랜덤 고양이 이미지를 가져오는 React Query Hook
 */
async function fetchRandomCat() {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  if (!res.ok) {
    throw new Error("랜덤 이미지를 가져오는 중 오류 발생");
  }
  const data = await res.json();
  return data[0]?.url; // 이미지 URL 반환
}

export function useFetchRandomCat() {
  return useQuery({
    queryKey: ["randomCat"],
    queryFn: fetchRandomCat,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
    retry: 2, // 요청 실패 시 2번 재시도
  });
}
