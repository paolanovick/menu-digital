require("dotenv").config();
const mongoose = require("mongoose");

// Importar modelos
const Restaurante = require("./models/Restaurante");
const Usuario = require("./models/Usuario");
const Categoria = require("./models/Categoria");
const Plato = require("./models/Plato");

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB conectado");
    console.log("📋 Modelos cargados:");
    console.log("   - Restaurante");
    console.log("   - Usuario");
    console.log("   - Categoria");
    console.log("   - Plato");
    console.log("\n✨ ¡Modelos funcionando correctamente!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error:", err.message);
    process.exit(1);
  });
