import { createContext, useContext, useState, useEffect } from "react";
import api, { getMiRestaurante } from "../services/api";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [restaurante, setRestaurante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // CAMBIADO: de "api/auth/me" a "/auth/me"
        const res = await api.get("/auth/me");
        console.log("🔧 AuthContext - Usuario cargado:", res.data.data);
        const userData = res.data.data;
        setUser(userData);
        if (userData.rol === "admin") {
          try {
            const resRest = await getMiRestaurante();
            setRestaurante(resRest.data.data);
          } catch {
            // sin restaurante asignado
          }
        }
      } catch (error) {
        console.error("Error loading user:", error);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    // CAMBIADO: de "api/auth/login" a "/auth/login"
    const res = await api.post("/auth/login", { email, password });
    const { token, usuario } = res.data.data;

    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setToken(token);
    setUser(usuario);

    if (usuario.rol === "admin") {
      try {
        const resRest = await getMiRestaurante();
        setRestaurante(resRest.data.data);
      } catch {
        // sin restaurante
      }
    }

    return usuario;
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
    setRestaurante(null);
  };

  return (
    <AuthContext.Provider value={{ user, restaurante, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
