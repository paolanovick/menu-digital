const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema(
  {
    // RELACIÓN CON RESTAURANTE
    restauranteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurante",
      required: [true, "La categoría debe estar asociada a un restaurante"],
    },

    // INFORMACIÓN BÁSICA
    nombre: {
      type: String,
      required: [true, "El nombre de la categoría es obligatorio"],
      trim: true,
      maxlength: [50, "El nombre no puede tener más de 50 caracteres"],
    },

    descripcion: {
      type: String,
      maxlength: [200, "La descripción no puede tener más de 200 caracteres"],
      default: "",
    },

    // ÍCONO/EMOJI
    icono: {
      type: String,
      default: "", // ← Cambiar de "🍽️" a ""
      maxlength: [10, "El ícono no puede tener más de 10 caracteres"],
    },

    // IMAGEN (opcional, algunos restaurantes usan fotos en vez de iconos)
    imagen: {
      type: String, // URL de Cloudinary
      default: "",
    },

    // COLOR PERSONALIZADO (opcional)
    color: {
      type: String,
      default: "#4ECDC4",
    },

    // ORDEN DE VISUALIZACIÓN
    orden: {
      type: Number,
      default: 0,
    },

    // VISIBILIDAD
    visible: {
      type: Boolean,
      default: true,
    },

    // ESTADO
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// ÍNDICE COMPUESTO: Para búsquedas rápidas por restaurante
categoriaSchema.index({ restauranteId: 1, orden: 1 });

// MÉTODO ESTÁTICO: Obtener categorías visibles de un restaurante
categoriaSchema.statics.obtenerVisibles = function (restauranteId) {
  return this.find({
    restauranteId,
    visible: true,
    activo: true,
  }).sort({ orden: 1 });
};

// MÉTODO: Contar platos en esta categoría
categoriaSchema.methods.contarPlatos = async function () {
  const Plato = mongoose.model("Plato");
  return await Plato.countDocuments({
    categoriaId: this._id,
    visible: true,
  });
};

module.exports = mongoose.model("Categoria", categoriaSchema);
