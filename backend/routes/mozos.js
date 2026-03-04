const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const { protect } = require("../middleware/auth");

// Solo admin puede gestionar mozos de su restaurante
const soloAdmin = (req, res, next) => {
  if (req.usuario.rol !== "admin") {
    return res.status(403).json({ success: false, message: "Solo el admin puede gestionar mozos" });
  }
  next();
};

// GET /api/mozos - listar mozos del restaurante
router.get("/", protect, soloAdmin, async (req, res) => {
  try {
    const mozos = await Usuario.find({
      restauranteId: req.usuario.restauranteId,
      rol: "mozo",
    }).select("-password");
    res.json({ success: true, data: mozos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/mozos - crear mozo
router.post("/", protect, soloAdmin, async (req, res) => {
  try {
    const { nombre, email, password, telefono } = req.body;
    const mozo = await Usuario.create({
      nombre,
      email,
      password,
      telefono,
      rol: "mozo",
      restauranteId: req.usuario.restauranteId,
    });
    res.status(201).json({ success: true, data: mozo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// GET /api/mozos/:id - obtener mozo por id
router.get("/:id", protect, soloAdmin, async (req, res) => {
  try {
    const mozo = await Usuario.findOne({
      _id: req.params.id,
      restauranteId: req.usuario.restauranteId,
      rol: "mozo",
    }).select("-password");
    if (!mozo) return res.status(404).json({ success: false, message: "Mozo no encontrado" });
    res.json({ success: true, data: mozo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/mozos/:id - actualizar mozo
router.put("/:id", protect, soloAdmin, async (req, res) => {
  try {
    const { nombre, email, telefono, activo } = req.body;
    const update = { nombre, email, telefono, activo };

    // Si se pasa password, dejamos que el modelo lo hashee
    if (req.body.password) {
      const mozo = await Usuario.findOne({
        _id: req.params.id,
        restauranteId: req.usuario.restauranteId,
        rol: "mozo",
      });
      if (!mozo) return res.status(404).json({ success: false, message: "Mozo no encontrado" });
      Object.assign(mozo, update);
      mozo.password = req.body.password;
      await mozo.save();
      return res.json({ success: true, data: mozo });
    }

    const mozo = await Usuario.findOneAndUpdate(
      { _id: req.params.id, restauranteId: req.usuario.restauranteId, rol: "mozo" },
      update,
      { new: true, runValidators: true }
    ).select("-password");
    if (!mozo) return res.status(404).json({ success: false, message: "Mozo no encontrado" });
    res.json({ success: true, data: mozo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/mozos/:id - eliminar mozo
router.delete("/:id", protect, soloAdmin, async (req, res) => {
  try {
    const mozo = await Usuario.findOneAndDelete({
      _id: req.params.id,
      restauranteId: req.usuario.restauranteId,
      rol: "mozo",
    });
    if (!mozo) return res.status(404).json({ success: false, message: "Mozo no encontrado" });
    res.json({ success: true, message: "Mozo eliminado" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
