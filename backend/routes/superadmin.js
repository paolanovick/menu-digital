const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getAllRestaurantes,
  getRestauranteById, // ← AGREGAR
  crearRestaurante,
  actualizarRestaurante,
  eliminarRestaurante,
  getAllUsuarios,
  getUsuarioById, // ← AGREGAR
  crearUsuario,
  actualizarUsuario, // ← AGREGAR
  eliminarUsuario,
} = require("../controllers/superadminController");
const { protect, superadminOnly } = require("../middleware/auth");

// Proteger todas las rutas
router.use(protect);
router.use(superadminOnly);

// Dashboard
router.get("/stats", getDashboardStats);

// Restaurantes
router.get("/restaurantes", getAllRestaurantes);
router.get("/restaurantes/:id", getRestauranteById);
router.post("/restaurantes", crearRestaurante);
router.put("/restaurantes/:id", actualizarRestaurante);
router.delete("/restaurantes/:id", eliminarRestaurante);

// Usuarios
router.get('/usuarios', getAllUsuarios);
router.get('/usuarios/:id', getUsuarioById);           // ← AGREGAR
router.post('/usuarios', crearUsuario);
router.put('/usuarios/:id', actualizarUsuario);        // ← AGREGAR
router.delete('/usuarios/:id', eliminarUsuario);

module.exports = router;
