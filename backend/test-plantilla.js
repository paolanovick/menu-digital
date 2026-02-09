const axios = require("axios");
const fs = require("fs");

const descargarPlantilla = async () => {
  try {
    // Tu token del usuario que creaste ayer
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODdjNTY3YWM1NWM5ZmVlNDNkMmJjMSIsImlhdCI6MTc3MDUwNTU3NSwiZXhwIjoxNzczMDk3NTc1fQ.r85PzM2N91fdXleWuzVCLVwRyBmK2cKYVN-WX7z8UHs";

    console.log("📥 Descargando plantilla Excel...");

    const response = await axios.get(
      "http://localhost:3002/api/import/plantilla",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "arraybuffer",
      },
    );

    // Guardar archivo
    fs.writeFileSync("plantilla-menu.xlsx", response.data);

    console.log("✅ ¡Plantilla descargada!");
    console.log("📄 Archivo guardado: plantilla-menu.xlsx");
    console.log("\n📋 Ahora:");
    console.log("1. Abre plantilla-menu.xlsx en Excel");
    console.log("2. Llénala con los platos de tu restaurante");
    console.log('3. Guárdala como "mi-menu.xlsx"');
    console.log("4. Ejecuta: node test-import.js");
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.response) {
      console.log("Respuesta:", error.response.data);
    }
  }
};

descargarPlantilla();
