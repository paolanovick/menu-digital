const express = require("express");
const router = express.Router();
const Pedido = require("../models/Pedido");
const { protect } = require("../middleware/auth");

// POST /api/pedidos  (público para delivery, protegido para mesa)
router.post("/", async (req, res) => {
  try {
    const pedido = await Pedido.create(req.body);
    res.status(201).json({ success: true, data: pedido });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// GET /api/pedidos (admin + mozo)
router.get("/", protect, async (req, res) => {
  try {
    const restauranteId = req.usuario.restauranteId;
    const { tipo, estado, limite = 50 } = req.query;

    const filtro = { restauranteId };
    if (tipo) filtro.tipo = tipo;
    if (estado) filtro.estado = estado;

    const pedidos = await Pedido.find(filtro)
      .sort({ createdAt: -1 })
      .limit(Number(limite));

    res.json({ success: true, data: pedidos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/pedidos/nuevos-count (para badge en sidebar)
router.get("/nuevos-count", protect, async (req, res) => {
  try {
    const count = await Pedido.countDocuments({
      restauranteId: req.usuario.restauranteId,
      estado: "nuevo",
    });
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/pedidos/:id/estado (admin + mozo)
router.put("/:id/estado", protect, async (req, res) => {
  try {
    const { estado } = req.body;
    const estadosValidos = ["nuevo", "preparando", "listo", "entregado", "cancelado"];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ success: false, message: "Estado inválido" });
    }

    const pedido = await Pedido.findOneAndUpdate(
      { _id: req.params.id, restauranteId: req.usuario.restauranteId },
      { estado },
      { new: true }
    );
    if (!pedido) return res.status(404).json({ success: false, message: "Pedido no encontrado" });
    res.json({ success: true, data: pedido });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
