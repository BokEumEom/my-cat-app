// src/api/catApi.js
const API_BASE_URL = "https://api.thecatapi.com/v1";
const API_KEY = "live_5wTKGCTaR1ftnySLIGyqFpsxX1z4lhIsaiFWGY45hnqTemrJya2H8fNgkTuApe23"; // The Cat API에서 발급받은 키

// 🐱 모든 고양이 품종 가져오기
export async function getCatBreeds() {
  try {
    const response = await fetch(`${API_BASE_URL}/breeds`, {
      headers: { "x-api-key": API_KEY },
    });
    if (!response.ok) throw new Error("고양이 품종 데이터를 불러오는 중 오류 발생");
    return await response.json();
  } catch (error) {
    console.error("API 오류:", error);
    return [];
  }
}

// 🐱 특정 고양이 품종 정보 가져오기 (reference_image_id 사용)
export async function getCatBreedById(breedId) {
  try {
    // 1️⃣ 품종 정보 요청
    const response = await fetch(`${API_BASE_URL}/breeds`, {
      headers: { "x-api-key": API_KEY },
    });
    if (!response.ok) throw new Error("고양이 품종 상세 데이터를 불러오는 중 오류 발생");

    // 모든 품종 중에서 ID에 해당하는 품종 찾기
    const breeds = await response.json();
    const breed = breeds.find((b) => b.id === breedId);
    if (!breed) throw new Error("해당 ID의 품종을 찾을 수 없습니다.");

    // 2️⃣ 이미지 정보 요청 (reference_image_id 사용)
    if (breed.reference_image_id) {
      const imageResponse = await fetch(`${API_BASE_URL}/images/${breed.reference_image_id}`, {
        headers: { "x-api-key": API_KEY },
      });
      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        breed.image = { url: imageData.url }; // 품종 객체에 이미지 URL 추가
      }
    }

    return breed;
  } catch (error) {
    console.error("API 오류:", error);
    return null;
  }
}
