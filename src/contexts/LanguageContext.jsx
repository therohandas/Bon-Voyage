// src/contexts/LanguageContext.jsx
import React, { createContext, useContext, useState } from "react";

const LangContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
