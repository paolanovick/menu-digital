import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Públicas
export const getRestauranteBySlug = (slug) => api.get(`/restaurantes/${slug}`);

export const getCategorias = (restauranteId) =>
  api.get(`/categorias?restauranteId=${restauranteId}`);

export const getPlatos = (restauranteId, categoriaId = null) => {
  let url = `/platos?restauranteId=${restauranteId}`;
  if (categoriaId) url += `&categoriaId=${categoriaId}`;
  return api.get(url);
};

export const getPlatosDestacados = (restauranteId) =>
  api.get(`/platos/destacados?restauranteId=${restauranteId}`);

// Anuncios públicos
export const getAnunciosPublicos = (restauranteId, categoriaId = null) => {
  let url = `/anuncios?restauranteId=${restauranteId}`;
  if (categoriaId) url += `&categoriaId=${categoriaId}`;
  return api.get(url);
};

// ============================================
// SUPERADMIN ENDPOINTS
// ============================================

// Dashboard stats
export const getSuperadminStats = () => api.get("/superadmin/stats");

// Restaurantes
export const getSuperadminRestaurantes = () =>
  api.get("/superadmin/restaurantes");

export const crearRestaurante = (data) =>
  api.post("/superadmin/restaurantes", data);

export const actualizarRestauranteSuperadmin = (id, data) =>
  api.put(`/superadmin/restaurantes/${id}`, data);

export const eliminarRestaurante = (id) =>
  api.delete(`/superadmin/restaurantes/${id}`);

// Usuarios
export const getSuperadminUsuarios = () => api.get("/superadmin/usuarios");

export const crearUsuarioSuperadmin = (data) =>
  api.post("/superadmin/usuarios", data);

export const eliminarUsuarioSuperadmin = (id) =>
  api.delete(`/superadmin/usuarios/${id}`);

export const getUsuarioById = (id) => api.get(`/superadmin/usuarios/${id}`);

export const actualizarUsuarioSuperadmin = (id, data) =>
  api.put(`/superadmin/usuarios/${id}`, data);

export default api;
