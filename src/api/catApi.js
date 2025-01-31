// src/api/catApi.js
const API_URL = "https://api.thecatapi.com/v1/breeds";
const API_KEY = "live_5wTKGCTaR1ftnySLIGyqFpsxX1z4lhIsaiFWGY45hnqTemrJya2H8fNgkTuApe23"; // The Cat API에서 발급받은 키

// 🐱 모든 고양이 품종 가져오기
export async function getCatBreeds() {
  try {
    const response = await fetch(API_URL, {
      headers: { "x-api-key": API_KEY },
    });
    if (!response.ok) throw new Error("고양이 품종 데이터를 불러오는 중 오류 발생");
    return await response.json();
  } catch (error) {
    console.error("API 오류:", error);
    return [];
  }
}

// 🐱 특정 고양이 품종 ID로 정보 가져오기
export async function getCatBreedById(breedId) {
  try {
    const response = await fetch(`${API_URL}/${breedId}`, {
      headers: { "x-api-key": API_KEY },
    });
    if (!response.ok) throw new Error("고양이 품종 상세 데이터를 불러오는 중 오류 발생");
    return await response.json();
  } catch (error) {
    console.error("API 오류:", error);
    return null;
  }
}
