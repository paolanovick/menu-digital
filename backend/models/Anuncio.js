const mongoose = require("mongoose");

const anuncioSchema = new mongoose.Schema(
  {
    restauranteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurante",
      required: true,
    },
    texto: {
      type: String,
      required: true,
      maxlength: 200,
    },
    icono: {
      type: String,
      default: "📢",
    },
    categoriaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      default: null, // null = global (todas las páginas)
    },
    activo: {
      type: Boolean,
      default: true,
    },
    orden: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Índices
anuncioSchema.index({ restauranteId: 1, activo: 1 });
anuncioSchema.index({ restauranteId: 1, categoriaId: 1 });

module.exports = mongoose.model("Anuncio", anuncioSchema);
