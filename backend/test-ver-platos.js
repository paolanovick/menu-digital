const axios = require("axios");

const verPlatos = async () => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODdjNTY3YWM1NWM5ZmVlNDNkMmJjMSIsImlhdCI6MTc3MDUwNTU3NSwiZXhwIjoxNzczMDk3NTc1fQ.r85PzM2N91fdXleWuzVCLVwRyBmK2cKYVN-WX7z8UHs";

    console.log("📋 Obteniendo platos del restaurante...\n");

    const response = await axios.get(
      `http://localhost:3002/api/platos/admin/mis-platos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(`✅ Total de platos: ${response.data.count}\n`);

    response.data.data.forEach((plato, index) => {
      console.log(`${index + 1}. ${plato.nombre}`);
      console.log(`   Categoría: ${plato.categoriaId.nombre}`);
      console.log(`   Precio: $${plato.precio}`);
      console.log(`   Ingredientes: ${plato.ingredientes.join(", ")}`);
      if (plato.imagen) {
        console.log(`   Imagen: ${plato.imagen}`);
      }
      if (plato.alergenos.length > 0) {
        console.log(`   Alérgenos: ${plato.alergenos.join(", ")}`);
      }
      console.log("");
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.response) {
      console.log("Respuesta:", error.response.data);
    }
  }
};

verPlatos();
