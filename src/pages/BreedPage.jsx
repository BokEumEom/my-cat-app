// src/pages/BreedPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCatBreedById } from "../api/catApi";
import Loader from "../components/common/Loader";

function BreedPage() {
  const { id } = useParams(); // URL에서 품종 ID 가져오기
  const [breed, setBreed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBreed() {
      try {
        setLoading(true);
        const data = await getCatBreedById(id);
        if (!data) throw new Error("데이터를 찾을 수 없습니다.");
        setBreed(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBreed();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>{breed.name}</h1>
      <img src={breed.image?.url} alt={breed.name} style={{ width: "300px" }} />
      <p><strong>출신:</strong> {breed.origin}</p>
      <p><strong>성격:</strong> {breed.temperament}</p>
      <p>{breed.description}</p>
    </div>
  );
}

export default BreedPage;
