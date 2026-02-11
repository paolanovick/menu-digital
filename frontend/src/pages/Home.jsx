import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRestauranteBySlug, getCategorias } from "../services/api";
import { ThemeProvider } from "../context/ThemeContext";
import CategoryIcon from "../components/CategoryIcon";
import Header from "../components/Header";
import AnunciosTicker from "../components/AnunciosTicker";
import Footer from "../components/Footer";


export default function Home() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [restaurante, setRestaurante] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resRestaurante = await getRestauranteBySlug(slug);
        const rest = resRestaurante.data.data;
        setRestaurante(rest);

        // Guardar configuración en localStorage
        localStorage.setItem(
          "restauranteData",
          JSON.stringify({
            tickerActivo: rest.tickerActivo ?? true,
            whatsapp: rest.contacto?.whatsapp || "",
          }),
        );

        const resCategorias = await getCategorias(rest._id);
        setCategorias(resCategorias.data.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl animate-pulse">Cargando...</div>
      </div>
    );
  }

  if (!restaurante) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Restaurante no encontrado</div>
      </div>
    );
  }

  return (
    <ThemeProvider tema={restaurante.tema}>
      <div
        className="min-h-screen pb-12 relative"
        style={{
          backgroundImage: "url(/backgroundMantel.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay para controlar opacidad */}
        <div className="absolute inset-0 bg-cream opacity-85 -z-10"></div>

        <Header restaurante={restaurante} />
        <AnunciosTicker restauranteId={restaurante._id} />

        {/* Hero */}
        <div className="text-center py-8 px-4">
          {/* Logo grande */}
          {restaurante.logo && (
            <div className="mb-4">
              <img
                src={restaurante.logo}
                alt={restaurante.nombre}
                className="h-38 w-auto mx-auto object-contain"
              />
            </div>
          )}

          <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">
            {restaurante.nombre}
          </h1>

          {restaurante.descripcion && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {restaurante.descripcion}
            </p>
          )}
        </div>

        {/* Categorías */}
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Nuestra Carta</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {/* Categorías normales */}
            {categorias.map((categoria) => (
              <CategoryIcon
                key={categoria._id}
                categoria={categoria}
                onClick={() => {
                  const categoriaSlug = categoria.nombre
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, "-");
                  navigate(`/${slug}/categoria/${categoriaSlug}`, {
                    state: {
                      categoriaId: categoria._id,
                      categoriaNombre: categoria.nombre,
                    },
                  });
                }}
              />
            ))}

            {/* 🚚 DELIVERY - Solo si está activo */}
            {restaurante.deliveryActivo && (
              <CategoryIcon
                categoria={{
                  _id: "delivery",
                  nombre: "Delivery",
                  icono: "🚚",
                }}
                onClick={() => navigate(`/${slug}/delivery`)} // ← Cambiar de envios a delivery
              />
            )}
          </div>
        </div>
      </div>

      <Footer restaurante={restaurante} />
    </ThemeProvider>
  );
}
