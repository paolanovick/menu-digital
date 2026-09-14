import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRestauranteBySlug, getCategorias, getPlatos } from "../services/api";
import { ThemeProvider } from "../context/ThemeContext";
import CategoryIcon from "../components/CategoryIcon";
import Header from "../components/Header";
import AnunciosTicker from "../components/AnunciosTicker";
import Footer from "../components/Footer";
import CarouselDestacados from "../components/CarouselDestacados";

const destacados = [
  { nombre: "Tortilla de papas", video: "/cinematic-menu/tortilla2-sin-fondo-blanco.mp4?v=5d1ef7b120" },
  { nombre: "Milanesa con guarnición", video: "/cinematic-menu/milanesa-sin-fondo-blanco.mp4?v=c0039135ae" },
  { nombre: "Bife de chorizo", video: "/cinematic-menu/bife-de-chorizo-sin-fondo-blanco.mp4?v=f65a675a08" },
];

const normalizarNombre = (nombre) => (nombre || "")
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .toLowerCase().trim().replace(/\s+/g, " ");

export default function Home() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [restaurante, setRestaurante] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [platosDestacados, setPlatosDestacados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      setLoading(true);
      setRestaurante(null);
      setPlatosDestacados([]);
      try {
        const resRestaurante = await getRestauranteBySlug(slug);
        const rest = resRestaurante.data.data;
        if (cancelled) return;
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
        if (cancelled) return;
        setCategorias(resCategorias.data.data);
        if (slug === "tucomida") {
          const resPlatos = await getPlatos(rest._id);
          if (cancelled) return;
          setPlatosDestacados(destacados.flatMap((destacado) => {
            const plato = resPlatos.data.data.find((item) =>
              normalizarNombre(item.nombre) === normalizarNombre(destacado.nombre));
            return plato ? [{ ...plato, video: destacado.video, poster: plato.imagen }] : [];
          }));
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader">
          <div className="cup">
            <div className="cup-handle"></div>
            <div className="smoke one"></div>
            <div className="smoke two"></div>
            <div className="smoke three"></div>
          </div>
          <div className="load">Cargando...</div>
        </div>
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
            <div className="mb-6">
              <img
                src={restaurante.logo}
                alt={restaurante.nombre}
                className="h-40 w-auto mx-auto object-contain" // Antes h-32, ahora h-40
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

        {slug === "tucomida" && platosDestacados.length > 0 && (
          <section className="container mx-auto px-4" aria-labelledby="destacados-titulo">
            <h2 id="destacados-titulo" className="font-display text-3xl md:text-4xl font-bold text-center mb-6">
              Lo mejor de la casa
            </h2>
            <CarouselDestacados platos={platosDestacados} mostrarDetalles={false} />
          </section>
        )}

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
