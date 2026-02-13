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

// ============================================
// PÚBLICAS
// ============================================
export const getRestauranteBySlug = (slug) =>
  api.get(`/api/restaurantes/${slug}`);

export const getCategorias = (restauranteId) =>
  api.get(`/api/categorias?restauranteId=${restauranteId}`);

export const getPlatos = (restauranteId, categoriaId = null) => {
  let url = `/api/platos?restauranteId=${restauranteId}`;
  if (categoriaId) url += `&categoriaId=${categoriaId}`;
  return api.get(url);
};

export const getPlatosDestacados = (restauranteId) =>
  api.get(`/api/platos/destacados?restauranteId=${restauranteId}`);

export const getAnunciosPublicos = (restauranteId, categoriaId = null) => {
  let url = `/api/anuncios?restauranteId=${restauranteId}`;
  if (categoriaId) url += `&categoriaId=${categoriaId}`;
  return api.get(url);
};

// ============================================
// ADMIN - RESTAURANTE
// ============================================
export const getMiRestaurante = () =>
  api.get("/api/restaurantes/admin/mi-restaurante");

export const actualizarRestaurante = (id, data) =>
  api.put(`/api/restaurantes/${id}`, data);

export const actualizarTema = (id, tema) =>
  api.put(`/api/restaurantes/${id}/tema`, tema);

export const actualizarHorarios = (id, horarios) =>
  api.put(`/api/restaurantes/${id}/horarios`, horarios);

export const actualizarContacto = (id, contacto) =>
  api.put(`/api/restaurantes/${id}/contacto`, contacto);

export const actualizarDeliveryConfig = (id, config) =>
  api.put(`/api/restaurantes/${id}/delivery-config`, config);

// ============================================
// ADMIN - CATEGORÍAS
// ============================================
export const getMisCategorias = () =>
  api.get("/api/categorias/admin/mis-categorias");

export const crearCategoria = (data) => api.post("/api/categorias", data);

export const actualizarCategoria = (id, data) =>
  api.put(`/api/categorias/${id}`, data);

export const eliminarCategoria = (id) => api.delete(`/api/categorias/${id}`);

// ============================================
// ADMIN - PLATOS
// ============================================
export const getMisPlatos = () => api.get("/api/platos/admin/mis-platos");

export const crearPlato = (data) => api.post("/api/platos", data);

export const actualizarPlato = (id, data) => api.put(`/api/platos/${id}`, data);

export const toggleDestacado = (id) => api.put(`/api/platos/${id}/destacado`);

export const eliminarPlato = (id) => api.delete(`/api/platos/${id}`);

// ============================================
// ADMIN - ANUNCIOS
// ============================================
export const getMisAnuncios = () => api.get("/api/anuncios/admin/mis-anuncios");

export const crearAnuncio = (data) => api.post("/api/anuncios", data);

export const actualizarAnuncio = (id, data) =>
  api.put(`/api/anuncios/${id}`, data);

export const eliminarAnuncio = (id) => api.delete(`/api/anuncios/${id}`);

// ============================================
// ADMIN - IMPORTACIÓN
// ============================================
export const descargarPlantilla = () =>
  api.get("/api/import/plantilla", { responseType: "blob" });

export const importarMenu = (formData) =>
  api.post("/api/import/menu", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ============================================
// SUPERADMIN
// ============================================
export const getSuperadminStats = () => api.get("/api/superadmin/stats");

export const getSuperadminRestaurantes = () =>
  api.get("/api/superadmin/restaurantes");

export const crearRestaurante = (data) =>
  api.post("/api/superadmin/restaurantes", data);

export const actualizarRestauranteSuperadmin = (id, data) =>
  api.put(`/api/superadmin/restaurantes/${id}`, data);

export const eliminarRestaurante = (id) =>
  api.delete(`/api/superadmin/restaurantes/${id}`);

export const getSuperadminUsuarios = () => api.get("/api/superadmin/usuarios");

export const crearUsuarioSuperadmin = (data) =>
  api.post("/api/superadmin/usuarios", data);

export const eliminarUsuarioSuperadmin = (id) =>
  api.delete(`/api/superadmin/usuarios/${id}`);

export const getUsuarioById = (id) => api.get(`/api/superadmin/usuarios/${id}`);

export const actualizarUsuarioSuperadmin = (id, data) =>
  api.put(`/api/superadmin/usuarios/${id}`, data);

export default api;
