// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, BreedPage, FavoritesPage, BasicKnowledgePage, NotFound } from "./pages";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/breed/:id" element={<BreedPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/basic-knowledge" element={<BasicKnowledgePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
