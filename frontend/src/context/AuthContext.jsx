import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
       const res = await api.get("/api/auth/me");
       console.log("🔧 AuthContext - Usuario cargado:", res.data.data); // DEBUG
       setUser(res.data.data);
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
    const res = await api.post("/api/auth/login", { email, password });
    const { token, usuario } = res.data.data;

    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setToken(token);
    setUser(usuario);

    return usuario;
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
