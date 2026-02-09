require("dotenv").config();
const mongoose = require("mongoose");
const Usuario = require("../models/Usuario");

const crearSuperadmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB conectado");

    // Verificar si ya existe
    const existe = await Usuario.findOne({
      email: "superadmin@menudigital.com",
    });

    if (existe) {
      console.log("⚠️ El superadmin ya existe");
      process.exit(0);
    }

    // Crear superadmin
    const superadmin = await Usuario.create({
      nombre: "Super Admin",
      email: "superadmin@menudigital.com",
      password: "superadmin123", // Cambiar esto en producción
      rol: "superadmin",
      restauranteId: null,
      activo: true,
    });

    console.log("🎉 Superadmin creado exitosamente:");
    console.log("Email:", superadmin.email);
    console.log("Password: superadmin123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

crearSuperadmin();
