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

export const getAnunciosPublicos = (restauranteId, categoriaId = null) => {
  let url = `/anuncios?restauranteId=${restauranteId}`;
  if (categoriaId) url += `&categoriaId=${categoriaId}`;
  return api.get(url);
};

// ============================================
// ADMIN - RESTAURANTE
// ============================================
export const getMiRestaurante = () =>
  api.get("/restaurantes/admin/mi-restaurante");

export const actualizarRestaurante = (id, data) =>
  api.put(`/restaurantes/${id}`, data);

export const actualizarTema = (id, tema) =>
  api.put(`/restaurantes/${id}/tema`, tema);

export const actualizarHorarios = (id, horarios) =>
  api.put(`/restaurantes/${id}/horarios`, horarios);

export const actualizarContacto = (id, contacto) =>
  api.put(`/restaurantes/${id}/contacto`, contacto);

export const actualizarDeliveryConfig = (id, config) =>
  api.put(`/restaurantes/${id}/delivery-config`, config);

// ============================================
// ADMIN - CATEGORÍAS
// ============================================
export const getMisCategorias = () =>
  api.get("/categorias/admin/mis-categorias");

export const crearCategoria = (data) => api.post("/categorias", data);

export const actualizarCategoria = (id, data) =>
  api.put(`/categorias/${id}`, data);

export const eliminarCategoria = (id) => api.delete(`/categorias/${id}`);

// ============================================
// ADMIN - PLATOS
// ============================================
export const getMisPlatos = () => api.get("/platos/admin/mis-platos");

export const crearPlato = (data) => api.post("/platos", data);

export const actualizarPlato = (id, data) => api.put(`/platos/${id}`, data);

export const toggleDestacado = (id) => api.put(`/platos/${id}/destacado`);

export const eliminarPlato = (id) => api.delete(`/platos/${id}`);

// ============================================
// ADMIN - ANUNCIOS
// ============================================
export const getMisAnuncios = () => api.get("/anuncios/admin/mis-anuncios");

export const crearAnuncio = (data) => api.post("/anuncios", data);

export const actualizarAnuncio = (id, data) => api.put(`/anuncios/${id}`, data);

export const eliminarAnuncio = (id) => api.delete(`/anuncios/${id}`);

// ============================================
// ADMIN - IMPORTACIÓN
// ============================================
export const descargarPlantilla = () =>
  api.get("/import/plantilla", { responseType: "blob" });

export const importarMenu = (formData) =>
  api.post("/import/menu", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ============================================
// SUPERADMIN
// ============================================
export const getSuperadminStats = () => api.get("/superadmin/stats");

export const getSuperadminRestaurantes = () =>
  api.get("/superadmin/restaurantes");

export const crearRestaurante = (data) =>
  api.post("/superadmin/restaurantes", data);

export const actualizarRestauranteSuperadmin = (id, data) =>
  api.put(`/superadmin/restaurantes/${id}`, data);

export const eliminarRestaurante = (id) =>
  api.delete(`/superadmin/restaurantes/${id}`);

export const getSuperadminUsuarios = () => api.get("/superadmin/usuarios");

export const crearUsuarioSuperadmin = (data) =>
  api.post("/superadmin/usuarios", data);

export const eliminarUsuarioSuperadmin = (id) =>
  api.delete(`/superadmin/usuarios/${id}`);

export const getUsuarioById = (id) => api.get(`/superadmin/usuarios/${id}`);

export const actualizarUsuarioSuperadmin = (id, data) =>
  api.put(`/superadmin/usuarios/${id}`, data);

export default api;
