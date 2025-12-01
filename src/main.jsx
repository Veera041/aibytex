// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./routes/AppRoutes";
import "./styles/global.css";
import "virtual:uno.css"; // if using UnoCSS Vite plugin

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Optionally determine isLoggedIn from context / localStorage */}
    <AppRoutes isLoggedIn={false} />
  </React.StrictMode>
);
