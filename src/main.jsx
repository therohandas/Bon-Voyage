// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import { FavoritesProvider } from "./contexts/FavoritesContext.jsx";
import { CompareProvider } from "./contexts/CompareContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <FavoritesProvider>
        <CompareProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CompareProvider>
      </FavoritesProvider>
    </LanguageProvider>
  </React.StrictMode>
);
