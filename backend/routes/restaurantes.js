const express = require("express");
const router = express.Router();
const {
  getRestauranteBySlug,
  getMiRestaurante,
  updateRestaurante,
  updateTema,
  updateHorarios,
  updateContacto,
  updateDeliveryConfig,
} = require("../controllers/restauranteController");

const { protect } = require("../middleware/auth");

// Rutas públicas
router.get("/:slug", getRestauranteBySlug);

// Rutas privadas
router.get("/admin/mi-restaurante", protect, getMiRestaurante);
router.put("/:id", protect, updateRestaurante);
router.put("/:id/tema", protect, updateTema);
router.put("/:id/horarios", protect, updateHorarios);
router.put("/:id/contacto", protect, updateContacto);
router.put("/:id/delivery-config", protect, updateDeliveryConfig);

module.exports = router;
