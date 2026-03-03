const mongoose = require("mongoose");

const mesaSchema = new mongoose.Schema(
  {
    restauranteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurante",
      required: [true, "El restaurante es obligatorio"],
    },

    numero: {
      type: Number,
      required: [true, "El número de mesa es obligatorio"],
      min: [1, "El número de mesa debe ser mayor a 0"],
    },

    nombre: {
      type: String,
      trim: true,
      maxlength: [50, "El nombre no puede tener más de 50 caracteres"],
      default: "",
    },

    capacidad: {
      type: Number,
      default: 4,
      min: 1,
    },

    estado: {
      type: String,
      enum: ["libre", "ocupada", "reservada"],
      default: "libre",
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
  }
);

mesaSchema.index({ restauranteId: 1, numero: 1 }, { unique: true });
mesaSchema.index({ restauranteId: 1, activo: 1 });

module.exports = mongoose.model("Mesa", mesaSchema);
