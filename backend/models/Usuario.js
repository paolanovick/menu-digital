const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usuarioSchema = new mongoose.Schema(
  {
    // RELACIÓN CON RESTAURANTE
    restauranteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurante",
      required: function () {
        return this.rol !== "superadmin";
      },
    },

    // INFORMACIÓN PERSONAL
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      maxlength: [100, "El nombre no puede tener más de 100 caracteres"],
    },

    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Por favor ingresa un email válido",
      ],
    },

    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
      select: false, // No se devuelve en queries por defecto (seguridad)
    },

    // ROL
    rol: {
      type: String,
      enum: ["admin", "superadmin"], // Para el futuro
      default: "admin",
    },

    // INFORMACIÓN ADICIONAL
    telefono: {
      type: String,
      trim: true,
    },

    avatar: {
      type: String, // URL de Cloudinary (opcional)
      default: "",
    },

    // ESTADO
    activo: {
      type: Boolean,
      default: true,
    },

    // ÚLTIMA ACTIVIDAD
    ultimoAcceso: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// MIDDLEWARE: Hashear password antes de guardar
usuarioSchema.pre('save', async function() {
  // Solo hashear si el password fue modificado
  if (!this.isModified('password')) {
    return;
  }

  // Generar salt y hashear
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// MÉTODO: Comparar password (para login)
usuarioSchema.methods.compararPassword = async function (passwordIngresado) {
  return await bcrypt.compare(passwordIngresado, this.password);
};

// MÉTODO: Actualizar último acceso
usuarioSchema.methods.actualizarUltimoAcceso = async function () {
  this.ultimoAcceso = new Date();
  await this.save({ validateBeforeSave: false });
};

// MÉTODO: Formatear respuesta (sin datos sensibles)
usuarioSchema.methods.toJSON = function () {
  const usuario = this.toObject();
  delete usuario.password;
  return usuario;
};

module.exports = mongoose.model("Usuario", usuarioSchema);
