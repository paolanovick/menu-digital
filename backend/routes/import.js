const express = require("express");
const router = express.Router();
const {
  importarMenu,
  descargarPlantilla,
} = require("../controllers/importController");
const { protect } = require("../middleware/auth");
const uploadFile = require("../middleware/uploadFile");

// Todas las rutas requieren autenticación
router.post("/menu", protect, uploadFile.single("archivo"), importarMenu);
router.get("/plantilla", protect, descargarPlantilla);

module.exports = router;
