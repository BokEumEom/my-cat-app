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
        // 이미지 id와 URL 모두 저장
        breed.image = { id: imageData.id, url: imageData.url };
      }
    }

    return breed;
  } catch (error) {
    console.error("API 오류:", error);
    return null;
  }
}

// ★ 즐겨찾기 관련 함수들 ★

// 1. 즐겨찾기 목록 조회
export async function getFavourites() {
  try {
    const response = await fetch(`${API_BASE_URL}/favourites`, {
      headers: { "x-api-key": API_KEY },
    });
    if (!response.ok) throw new Error("즐겨찾기 데이터를 불러오는 중 오류 발생");
    return await response.json();
  } catch (error) {
    console.error("API 오류:", error);
    return [];
  }
}

// 2. 즐겨찾기 추가  
// image_id와 (선택적) sub_id를 전달합니다. (여기서는 간단하게 "default-user" 사용)
export async function addFavourite(image_id, sub_id = "default-user") {
  try {
    const response = await fetch(`${API_BASE_URL}/favourites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({ image_id, sub_id }),
    });
    if (!response.ok) throw new Error("즐겨찾기 추가 중 오류 발생");
    return await response.json();
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}

// 3. 즐겨찾기 삭제
export async function removeFavourite(favourite_id) {
  try {
    const response = await fetch(`${API_BASE_URL}/favourites/${favourite_id}`, {
      method: "DELETE",
      headers: { "x-api-key": API_KEY },
    });
    if (!response.ok) throw new Error("즐겨찾기 삭제 중 오류 발생");
    return await response.json();
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
