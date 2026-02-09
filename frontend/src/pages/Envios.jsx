import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getRestauranteBySlug,
  getCategorias,
  getPlatos,
} from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CarouselEnvios from "../components/CarouselEnvios";
import CarouselDestacados from "../components/CarouselDestacados";
import AnunciosTicker from "../components/AnunciosTicker";
import { ThemeProvider } from "../context/ThemeContext";

export default function Envios() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [restaurante, setRestaurante] = useState(null);
  const [productosPorCategoria, setProductosPorCategoria] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resRest = await getRestauranteBySlug(slug);
      const rest = resRest.data.data;
      setRestaurante(rest);

      // Guardar datos para WhatsApp
      localStorage.setItem(
        "restauranteData",
        JSON.stringify({
          nombre: rest.nombre,
          whatsapp: rest.contacto?.whatsapp || "",
          tickerActivo: rest.tickerActivo ?? true,
        }),
      );

      const resCategorias = await getCategorias(rest._id);

      const productos = await Promise.all(
        resCategorias.data.data.map(async (cat) => {
          const resPlatos = await getPlatos(rest._id, cat._id);
          return {
            categoria: cat,
            productos: resPlatos.data.data,
          };
        }),
      );

      setProductosPorCategoria(productos);
    };

    fetchData();
  }, [slug]);

  if (!restaurante) return null;

  return (
    <ThemeProvider tema={restaurante.tema}>
      <div
        className="min-h-screen relative pb-20"
        style={{
          backgroundImage: "url(/backgroundMantel.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-cream opacity-85 -z-10"></div>

        <Header restaurante={restaurante} />
        <AnunciosTicker restauranteId={restaurante._id} />

        {/* Botón Volver al Menú */}
        <div className="container mx-auto px-4 pt-6">
          <button
            onClick={() => navigate(`/${slug}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al Menú
          </button>
        </div>

        {/* Destacados */}
        <section className="py-10 container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-6">
            Te recomendamos estos platos para tu envío
          </h2>
          <CarouselDestacados
            platos={productosPorCategoria.flatMap((p) =>
              p.productos.filter((pr) => pr.destacado),
            )}
          />
        </section>

        {/* Categorías */}
        <div className="space-y-16 px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-6">
            Te llevamos tu pedido a donde estés
          </h2>
          {productosPorCategoria.map(({ categoria, productos }) =>
            productos.length > 0 ? (
              <section key={categoria._id}>
                <h3 className="font-display text-2xl font-bold mb-4">
                  {categoria.nombre}
                </h3>
                <CarouselEnvios productos={productos} />
              </section>
            ) : null,
          )}
        </div>

        <Footer restaurante={restaurante} />
      </div>
    </ThemeProvider>
  );
}
