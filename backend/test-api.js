const axios = require("axios");

const testRegister = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3002/api/auth/register",
      {
        nombre: "Paola Novick",
        email: "paola2@test.com",
        password: "123456",
        restauranteNombre: "Restaurante de Paola",
        telefono: "1234567890",
      },
    );

    console.log("📥 RESPUESTA DEL SERVIDOR:");
    console.log(JSON.stringify(response.data, null, 2));

    if (response.data.success) {
      console.log("\n✅ ¡REGISTRO EXITOSO!");
      console.log(
        "🔑 Token:",
        response.data.data.token.substring(0, 50) + "...",
      );
      console.log("🍽️ Restaurante:", response.data.data.restaurante.nombre);
      console.log("🔗 Slug:", response.data.data.restaurante.slug);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.response) {
      console.log("Respuesta del servidor:", error.response.data);
    }
  }
};

testRegister();
