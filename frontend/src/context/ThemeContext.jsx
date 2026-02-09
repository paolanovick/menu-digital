/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

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
    }
  }, [tema]);

  return (
    <ThemeContext.Provider value={{ tema }}>{children}</ThemeContext.Provider>
  );
};
