const mongoose = require("mongoose");

const platoSchema = new mongoose.Schema(
  {
    // RELACIONES
    restauranteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurante",
      required: [true, "El plato debe estar asociado a un restaurante"],
    },

    categoriaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: [true, "El plato debe tener una categoría"],
    },

    // INFORMACIÓN BÁSICA
    nombre: {
      type: String,
      required: [true, "El nombre del plato es obligatorio"],
      trim: true,
      maxlength: [100, "El nombre no puede tener más de 100 caracteres"],
    },

    descripcion: {
      type: String,
      maxlength: [500, "La descripción no puede tener más de 500 caracteres"],
      default: "",
    },

    // PRECIO
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },

    // IMAGEN
    imagen: {
      type: String, // URL de Cloudinary
      default: "",
    },

    // INGREDIENTES
    ingredientes: {
      type: [String],
      default: [],
    },

    // ALÉRGENOS (Importante para seguridad alimentaria)
    alergenos: {
      type: [String],
      enum: [
        "gluten",
        "lacteos",
        "huevo",
        "pescado",
        "mariscos",
        "frutos_secos",
        "soja",
        "apio",
        "mostaza",
        "sesamo",
        "sulfitos",
        "lupino",
        "moluscos",
        "cacahuetes",
      ],
      default: [],
    },

    // ETIQUETAS ESPECIALES
    etiquetas: {
      vegetariano: {
        type: Boolean,
        default: false,
      },
      vegano: {
        type: Boolean,
        default: false,
      },
      sinGluten: {
        type: Boolean,
        default: false,
      },
      picante: {
        type: Boolean,
        default: false,
      },
      nuevo: {
        type: Boolean,
        default: false,
      },
    },

    // VALORACIÓN
    estrellas: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },

    // DESTACADO (Para mostrar en sección especial)
    destacado: {
      type: Boolean,
      default: false,
    },

    // DISPONIBILIDAD
    disponible: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      default: 0,
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

    // INFORMACIÓN ADICIONAL
    tiempoPreparacion: {
      type: Number, // En minutos
      default: null,
    },

    porciones: {
      type: String, // "1 porción", "Para 2 personas", etc.
      default: "",
    },

    calorias: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// ÍNDICES COMPUESTOS para búsquedas rápidas
platoSchema.index({ restauranteId: 1, categoriaId: 1, orden: 1 });
platoSchema.index({ restauranteId: 1, destacado: 1 });
platoSchema.index({ restauranteId: 1, disponible: 1, visible: 1 });

// MÉTODO ESTÁTICO: Obtener platos visibles de una categoría
platoSchema.statics.obtenerPorCategoria = function (
  restauranteId,
  categoriaId,
) {
  return this.find({
    restauranteId,
    categoriaId,
    visible: true,
    activo: true,
  }).sort({ orden: 1 });
};

// MÉTODO ESTÁTICO: Obtener platos destacados
platoSchema.statics.obtenerDestacados = function (restauranteId) {
  return this.find({
    restauranteId,
    destacado: true,
    disponible: true,
    visible: true,
  })
    .sort({ orden: 1 })
    .limit(6);
};

// MÉTODO: Formatear precio con símbolo de moneda
platoSchema.methods.formatearPrecio = function (simbolo = "$") {
  return `${simbolo}${this.precio.toLocaleString("es-AR")}`;
};

// MÉTODO: Verificar si tiene alérgenos
platoSchema.methods.tieneAlergenos = function () {
  return this.alergenos && this.alergenos.length > 0;
};

// MÉTODO VIRTUAL: Estado del plato (para admin)
platoSchema.virtual("estado").get(function () {
  if (!this.disponible) return "No disponible";
  if (!this.visible) return "Oculto";
  return "Activo";
});

// Asegurar que los virtuals se incluyan en JSON
platoSchema.set("toJSON", { virtuals: true });
platoSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Plato", platoSchema);
