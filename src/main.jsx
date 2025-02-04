import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/global.css";
import App from "./App.jsx";

// 1️⃣ QueryClient 인스턴스 생성
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 2️⃣ QueryClientProvider로 앱을 감싸서 React Query 활성화 */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
