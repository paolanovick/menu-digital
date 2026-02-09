const express = require("express");
const router = express.Router();
const {
  getCategorias,
  getMisCategorias,
  getCategoria,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  reordenarCategorias,
} = require("../controllers/categoriaController");

const { protect } = require("../middleware/auth");

// Rutas públicas
router.get("/", getCategorias);

// Rutas privadas
router.get("/admin/mis-categorias", protect, getMisCategorias);
router.get("/:id", protect, getCategoria);
router.post("/", protect, createCategoria);
router.put("/reordenar", protect, reordenarCategorias);
router.put("/:id", protect, updateCategoria);
router.delete("/:id", protect, deleteCategoria);

module.exports = router;
