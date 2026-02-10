/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

// Mapa de fuentes
const fontMap = {
  playfair: "'Playfair Display', serif",
  montserrat: "'Montserrat', sans-serif",
  lora: "'Lora', serif",
  poppins: "'Poppins', sans-serif",
  merriweather: "'Merriweather', serif",
  roboto: "'Roboto', sans-serif",
  dancing: "'Dancing Script', cursive",
  oswald: "'Oswald', sans-serif",
};

export const ThemeProvider = ({ children, tema }) => {
  useEffect(() => {
    if (tema) {
      document.documentElement.style.setProperty(
        "--color-primary",
        tema.colorPrimario,
      );
      document.documentElement.style.setProperty(
        "--color-secondary",
        tema.colorSecundario,
      );
      document.documentElement.style.setProperty("--color-bg", tema.colorFondo);
      document.documentElement.style.setProperty(
        "--color-text",
        tema.colorTexto,
      );

      // Aplicar fuente
      const fontFamily = fontMap[tema.fuente] || fontMap.playfair;
      document.documentElement.style.setProperty("--font-display", fontFamily);
    }
  }, [tema]);

  return (
    <ThemeContext.Provider value={{ tema }}>{children}</ThemeContext.Provider>
  );
};
