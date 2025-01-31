// src/components/Banner.jsx
import { useEffect, useState } from "react";
import styles from "../styles/Banner.module.css";

function Banner() {
  const [image, setImage] = useState("");

  useEffect(() => {
    async function fetchRandomImage() {
      const res = await fetch("https://api.thecatapi.com/v1/images/search");
      const data = await res.json();
      setImage(data[0]?.url);
    }
    fetchRandomImage();
  }, []);

  return (
    <div className={styles.banner}>
      {image && <img src={image} alt="Random Cat" className={styles.image} />}
    </div>
  );
}

export default Banner;
