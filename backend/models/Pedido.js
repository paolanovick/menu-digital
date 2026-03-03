const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema(
  {
    restauranteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurante",
      required: [true, "El restaurante es obligatorio"],
    },

    tipo: {
      type: String,
      enum: ["delivery", "mesa"],
      required: [true, "El tipo de pedido es obligatorio"],
    },

    estado: {
      type: String,
      enum: ["nuevo", "preparando", "listo", "entregado", "cancelado"],
      default: "nuevo",
    },

    items: [
      {
        platoId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Plato",
        },
        nombre: { type: String, required: true },
        precio: { type: Number, required: true },
        cantidad: { type: Number, required: true, min: 1 },
        subtotal: { type: Number, required: true },
      },
    ],

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    notas: {
      type: String,
      maxlength: [500, "Las notas no pueden tener más de 500 caracteres"],
      default: "",
    },

    // Solo para delivery
    datosCliente: {
      direccion: { type: String, default: "" },
      telefono: { type: String, default: "" },
      email: { type: String, default: "" },
    },

    // Solo para mesa
    mesaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mesa",
    },
    mesaNumero: {
      type: Number,
    },
    mozoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
    mozoNombre: {
      type: String,
      default: "",
    },

    numeroOrden: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-incrementar numeroOrden por restaurante
pedidoSchema.pre("save", async function () {
  if (this.isNew) {
    const ultimo = await this.constructor
      .findOne({ restauranteId: this.restauranteId })
      .sort({ numeroOrden: -1 })
      .select("numeroOrden");
    this.numeroOrden = ultimo ? (ultimo.numeroOrden || 0) + 1 : 1;
  }
});

pedidoSchema.index({ restauranteId: 1, estado: 1 });
pedidoSchema.index({ restauranteId: 1, createdAt: -1 });
pedidoSchema.index({ restauranteId: 1, tipo: 1 });

module.exports = mongoose.model("Pedido", pedidoSchema);
