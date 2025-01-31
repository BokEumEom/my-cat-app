// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>404 😿 페이지를 찾을 수 없습니다.</h1>
      <p>
        존재하지 않는 페이지입니다. <br />
        <Link to="/">홈으로 돌아가기</Link>
      </p>
    </div>
  );
}

export default NotFound;
