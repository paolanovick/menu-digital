const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const importarMenu = async () => {
  try {
    // Tu token
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODdjNTY3YWM1NWM5ZmVlNDNkMmJjMSIsImlhdCI6MTc3MDUwNTU3NSwiZXhwIjoxNzczMDk3NTc1fQ.r85PzM2N91fdXleWuzVCLVwRyBmK2cKYVN-WX7z8UHs";

    // Verificar que existe el archivo
    const archivo = "mi-menu.xlsx";

    if (!fs.existsSync(archivo)) {
      console.log("❌ No se encuentra el archivo:", archivo);
      console.log("📋 Asegúrate de:");
      console.log("1. Abrir plantilla-menu.xlsx");
      console.log("2. Llenar con tus platos");
      console.log('3. Guardarlo como "mi-menu.xlsx"');
      return;
    }

    console.log("📤 Importando menú desde:", archivo);
    console.log("🔗 URL: http://localhost:3002/api/import/menu\n");

    // Crear FormData
    const formData = new FormData();
    formData.append("archivo", fs.createReadStream(archivo));

    // Enviar archivo
    const response = await axios.post(
      "http://localhost:3002/api/import/menu",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          ...formData.getHeaders(),
        },
      },
    );

    console.log("📥 RESPUESTA DEL SERVIDOR:");
    console.log(JSON.stringify(response.data, null, 2));

    if (response.data.success) {
      console.log("\n✅ ¡IMPORTACIÓN EXITOSA!");
      console.log(
        `📊 Categorías creadas: ${response.data.data.categoriasCreadas}`,
      );
      console.log(`🍽️  Platos creados: ${response.data.data.platosCreados}`);

      if (response.data.data.errores.length > 0) {
        console.log("\n⚠️  Errores encontrados:");
        response.data.data.errores.forEach((err) => {
          console.log(`   Fila ${err.fila}: ${err.error}`);
        });
      }
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.response) {
      console.log("📊 Status:", error.response.status);
      console.log("📊 Respuesta:", error.response.data);
    }
  }
};

importarMenu();
