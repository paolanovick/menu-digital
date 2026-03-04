const express = require("express");
const router = express.Router();
const Mesa = require("../models/Mesa");
const { protect } = require("../middleware/auth");

// GET /api/mesas?restauranteId=xxx  (público para mozo interface)
router.get("/", protect, async (req, res) => {
  try {
    const restauranteId = req.usuario.restauranteId;
    const mesas = await Mesa.find({ restauranteId, activo: true }).sort({ orden: 1, numero: 1 });
    res.json({ success: true, data: mesas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/mesas/publico/:restauranteId  (sin auth, para mozo login)
router.get("/publico/:restauranteId", async (req, res) => {
  try {
    const mesas = await Mesa.find({ restauranteId: req.params.restauranteId, activo: true }).sort({ orden: 1, numero: 1 });
    res.json({ success: true, data: mesas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/mesas (admin only)
router.post("/", protect, async (req, res) => {
  try {
    if (req.usuario.rol === "mozo") {
      return res.status(403).json({ success: false, message: "Sin permiso" });
    }
    const mesa = await Mesa.create({
      ...req.body,
      restauranteId: req.usuario.restauranteId,
    });
    res.status(201).json({ success: true, data: mesa });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: `Ya existe una mesa con el número ${req.body.numero}` });
    }
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/mesas/:id (admin only)
router.put("/:id", protect, async (req, res) => {
  try {
    if (req.usuario.rol === "mozo") {
      return res.status(403).json({ success: false, message: "Sin permiso" });
    }
    const mesa = await Mesa.findOneAndUpdate(
      { _id: req.params.id, restauranteId: req.usuario.restauranteId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!mesa) return res.status(404).json({ success: false, message: "Mesa no encontrada" });
    res.json({ success: true, data: mesa });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: `Ya existe una mesa con el número ${req.body.numero}` });
    }
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/mesas/:id/estado (admin + mozo)
router.put("/:id/estado", protect, async (req, res) => {
  try {
    const { estado } = req.body;
    if (!["libre", "ocupada", "reservada"].includes(estado)) {
      return res.status(400).json({ success: false, message: "Estado inválido" });
    }
    const mesa = await Mesa.findOneAndUpdate(
      { _id: req.params.id, restauranteId: req.usuario.restauranteId },
      { estado },
      { new: true }
    );
    if (!mesa) return res.status(404).json({ success: false, message: "Mesa no encontrada" });
    res.json({ success: true, data: mesa });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/mesas/:id (admin only)
router.delete("/:id", protect, async (req, res) => {
  try {
    if (req.usuario.rol === "mozo") {
      return res.status(403).json({ success: false, message: "Sin permiso" });
    }
    await Mesa.findOneAndUpdate(
      { _id: req.params.id, restauranteId: req.usuario.restauranteId },
      { activo: false }
    );
    res.json({ success: true, message: "Mesa eliminada" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
