const express = require("express");
const router = express.Router();
const {
  getAnunciosPublicos,
  getMisAnuncios,
  crearAnuncio,
  actualizarAnuncio,
  toggleActivo,
  eliminarAnuncio,
} = require("../controllers/anuncioController");
const { protect } = require("../middleware/auth");

// Públicas
router.get("/", getAnunciosPublicos);

// Privadas (requieren autenticación)
router.get("/admin/mis-anuncios", protect, getMisAnuncios);
router.post("/", protect, crearAnuncio);
router.put("/:id", protect, actualizarAnuncio);
router.put("/:id/toggle", protect, toggleActivo);
router.delete("/:id", protect, eliminarAnuncio);

module.exports = router;
