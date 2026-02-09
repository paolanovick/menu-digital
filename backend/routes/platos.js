const express = require("express");
const router = express.Router();
const {
  getPlatos,
  getMisPlatos,
  getPlatosDestacados,
  getPlato,
  createPlato,
  updatePlato,
  deletePlato,
  toggleDisponibilidad,
  toggleDestacado,
} = require("../controllers/platoController");

const { protect } = require("../middleware/auth");

// Rutas públicas
router.get("/", getPlatos);
router.get("/destacados", getPlatosDestacados);
router.get("/:id", getPlato);

// Rutas privadas
router.get("/admin/mis-platos", protect, getMisPlatos);
router.post("/", protect, createPlato);
router.put("/:id", protect, updatePlato);
router.put("/:id/disponibilidad", protect, toggleDisponibilidad);
router.put("/:id/destacado", protect, toggleDestacado);
router.delete("/:id", protect, deletePlato);

module.exports = router;
