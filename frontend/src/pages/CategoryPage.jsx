import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  getRestauranteBySlug,
  getPlatos,
  getPlatosDestacados,
} from "../services/api";
import { ThemeProvider } from "../context/ThemeContext";
import Header from "../components/Header";
import CarouselDestacados from "../components/CarouselDestacados";
import PlatoCard from "../components/PlatoCard";
import { ArrowLeft } from "lucide-react";
import AnunciosTicker from "../components/AnunciosTicker";
import Footer from "../components/Footer";

export default function CategoryPage() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [restaurante, setRestaurante] = useState(null);
  const [platos, setPlatos] = useState([]);
  const [platosDestacados, setPlatosDestacados] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener info de categoría desde location.state
  const categoriaId = location.state?.categoriaId;
  const categoriaNombre = location.state?.categoriaNombre || "Menú";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener restaurante
        const resRestaurante = await getRestauranteBySlug(slug);
        setRestaurante(resRestaurante.data.data);

        const restauranteId = resRestaurante.data.data._id;

        // Obtener platos destacados (para carousel)
        const resDestacados = await getPlatosDestacados(restauranteId);
        setPlatosDestacados(resDestacados.data.data);

        // Obtener platos de esta categoría
        if (categoriaId) {
          const resPlatos = await getPlatos(restauranteId, categoriaId);
          setPlatos(resPlatos.data.data);
        } else {
          // Si no hay categoriaId, mostrar todos
          const resPlatos = await getPlatos(restauranteId);
          setPlatos(resPlatos.data.data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, categoriaId]);

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
        <div className="absolute inset-0 bg-cream opacity-85 -z-10"></div>
        <Header restaurante={restaurante} />
        <AnunciosTicker
          restauranteId={restaurante._id}
          categoriaId={categoriaId}
        />

        <div className="container mx-auto px-4 py-6">
          {/* Botón volver */}
          <button
            onClick={() => navigate(`/${slug}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Volver a categorías
          </button>

          {/* Carousel de destacados */}
          {platosDestacados.length > 0 && (
            <>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-8 mt-6">
                Te recomendamos
              </h2>
              <CarouselDestacados platos={platosDestacados} />
            </>
          )}

          {/* Título de categoría */}
          <h1 className="font-display text-3xl md:text-4xl font-bold text-center mb-8 mt-12">
            {categoriaNombre}
          </h1>

          {/* Grid de platos */}
          {platos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {platos.map((plato) => (
                <PlatoCard key={plato._id} plato={plato} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">
                No hay platos disponibles en esta categoría
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <Footer restaurante={restaurante} />
      </div>
    </ThemeProvider>
  );
}
