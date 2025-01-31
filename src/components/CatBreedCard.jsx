// src/components/CatBreedCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function CatBreedCard({ breed }) {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/breed/${breed.id}`)}>
      {breed.image?.url && (
        <img src={breed.image.url} alt={breed.name} className="card-img" />
      )}
      <h3>{breed.name}</h3>
      <p>{breed.temperament}</p>
    </div>
  );
}

export default CatBreedCard;
