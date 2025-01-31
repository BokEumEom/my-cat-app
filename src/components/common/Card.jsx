// src/components/common/Card.jsx
function Card({ image, title, description, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      {image && <img src={image} alt={title} className="card-img" />}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Card;
