const mongoose = require("mongoose");

const restauranteSchema = new mongoose.Schema(
  {
    // INFORMACIÓN BÁSICA
    nombre: {
      type: String,
      required: [true, "El nombre del restaurante es obligatorio"],
      trim: true,
      maxlength: [100, "El nombre no puede tener más de 100 caracteres"],
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    descripcion: {
      type: String,
      maxlength: [500, "La descripción no puede tener más de 500 caracteres"],
      default: "",
    },

    logo: {
      type: String, // URL de Cloudinary
      default: "",
    },

    // PERSONALIZACIÓN
    tema: {
      colorPrimario: {
        type: String,
        default: "#FF6B6B",
      },
      colorSecundario: {
        type: String,
        default: "#4ECDC4",
      },
      colorFondo: {
        type: String,
        default: "#FFFFFF",
      },
      colorTexto: {
        type: String,
        default: "#333333",
      },
      fuente: {
        type: String,
        enum: [
          "playfair",
          "montserrat",
          "lora",
          "poppins",
          "merriweather",
          "roboto",
          "dancing",
          "oswald",
        ],
        default: "playfair",
      },
    },
    // CONTACTO
    contacto: {
      email: {
        type: String,
        trim: true,
        lowercase: true,
      },
      telefono: {
        type: String,
        trim: true,
      },
      whatsapp: {
        type: String,
        trim: true,
      },
      direccion: {
        calle: String,
        ciudad: String,
        provincia: String,
        codigoPostal: String,
        pais: {
          type: String,
          default: "Argentina",
        },
      },
    },

    // HORARIOS
    horarios: {
      lunes: {
        abierto: { type: Boolean, default: true },
        apertura: { type: String, default: "12:00" },
        cierre: { type: String, default: "23:00" },
      },
      martes: {
        abierto: { type: Boolean, default: true },
        apertura: { type: String, default: "12:00" },
        cierre: { type: String, default: "23:00" },
      },
      miercoles: {
        abierto: { type: Boolean, default: true },
        apertura: { type: String, default: "12:00" },
        cierre: { type: String, default: "23:00" },
      },
      jueves: {
        abierto: { type: Boolean, default: true },
        apertura: { type: String, default: "12:00" },
        cierre: { type: String, default: "23:00" },
      },
      viernes: {
        abierto: { type: Boolean, default: true },
        apertura: { type: String, default: "12:00" },
        cierre: { type: String, default: "00:00" },
      },
      sabado: {
        abierto: { type: Boolean, default: true },
        apertura: { type: String, default: "12:00" },
        cierre: { type: String, default: "00:00" },
      },
      domingo: {
        abierto: { type: Boolean, default: false },
        apertura: { type: String, default: "12:00" },
        cierre: { type: String, default: "23:00" },
      },
    },

    // CONFIGURACIÓN
    configuracion: {
      moneda: {
        type: String,
        enum: ["ARS", "USD", "EUR"],
        default: "ARS",
      },
      simboloMoneda: {
        type: String,
        default: "$",
      },
      idioma: {
        type: String,
        enum: ["es", "en", "pt"],
        default: "es",
      },
      aceptaTarjeta: {
        type: Boolean,
        default: true,
      },
      aceptaEfectivo: {
        type: Boolean,
        default: true,
      },
      aceptaTransferencia: {
        type: Boolean,
        default: false,
      },
      muestraPrecios: {
        type: Boolean,
        default: true,
      },
    },

    // REDES SOCIALES
    redesSociales: {
      instagram: {
        type: String,
        trim: true,
      },
      facebook: {
        type: String,
        trim: true,
      },
    },

    // SISTEMA
    activo: {
      type: Boolean,
      default: true,
    },

    plan: {
      type: String,
      enum: ["basico", "premium"],
      default: "basico",
    },
    deliveryActivo: {
      type: Boolean,
      default: true,
    },
    tickerActivo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Crea automáticamente createdAt y updatedAt
  },
);

// Método para generar slug automáticamente desde el nombre
restauranteSchema.pre('validate', function() {
  if (this.nombre && !this.slug) {
    this.slug = this.nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Quita acentos
      .replace(/[^a-z0-9\s-]/g, '') // Quita caracteres especiales
      .replace(/\s+/g, '-') // Espacios a guiones
      .replace(/-+/g, '-') // Múltiples guiones a uno
      .trim();
  }
});

module.exports = mongoose.model("Restaurante", restauranteSchema);
