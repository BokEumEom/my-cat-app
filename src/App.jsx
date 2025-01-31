// src/routes.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, BreedPage, NotFound } from "./pages";
import Header from "./components/Header";

function AppRoutes() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/breed/:id" element={<BreedPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
