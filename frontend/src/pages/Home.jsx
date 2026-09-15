import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRestauranteBySlug, getCategorias, getPlatos } from "../services/api";
import { ThemeProvider } from "../context/ThemeContext";
import CategoryIcon from "../components/CategoryIcon";
import Header from "../components/Header";
import AnunciosTicker from "../components/AnunciosTicker";
import Footer from "../components/Footer";
import CarouselDestacados from "../components/CarouselDestacados";
import styles from "./Home.module.css";

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
        const rest = { ...resRestaurante.data.data };
        // Copia local del mismo logo; respetar otro logo si se cambia desde la API.
        if (slug === "tucomida" && rest.logo === "https://i.ibb.co/23xq4LnD/logo-Menu-R.png") {
          rest.logo = "/logoMenuR.png";
        }
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

  const mostrarDestacados = slug === "tucomida" && platosDestacados.length > 0;

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

        {/* Presentación y platos: dos columnas en desktop, apiladas en móvil. */}
        <div className={mostrarDestacados ? styles.featuredHero : undefined}>
        <div className={mostrarDestacados ? "mx-auto grid max-w-6xl min-w-0 gap-10 px-4 py-10 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-10 md:py-14 lg:gap-16" : ""}>
        <div className={mostrarDestacados ? "min-w-0 text-center" : "text-center py-8 px-4"}>
          {/* Logo grande */}
          {restaurante.logo && (
            <div className="mb-6">
              <img
                src={restaurante.logo}
                alt={restaurante.nombre}
                className={mostrarDestacados ? "h-48 w-auto max-w-full mx-auto object-contain md:h-64 lg:h-80" : "h-40 w-auto mx-auto object-contain"}
              />
            </div>
          )}

          <h1 className={`font-display font-bold mb-6 ${mostrarDestacados ? "text-4xl md:text-5xl lg:text-6xl tracking-tight" : "text-3xl md:text-4xl"}`}>
            {restaurante.nombre}
          </h1>

          {restaurante.descripcion && (
            <p className={`text-gray-600 mx-auto ${mostrarDestacados ? "max-w-sm text-lg lg:text-xl font-medium" : "text-lg max-w-2xl"}`}>
              {restaurante.descripcion}
            </p>
          )}
        </div>

        {mostrarDestacados && (
          <section className="w-full max-w-md mx-auto min-w-0 [&>div]:mb-0" aria-labelledby="destacados-titulo">
            <h2 id="destacados-titulo" className="font-display text-2xl lg:text-3xl font-bold text-center mb-6">
              Lo mejor de la casa
            </h2>
            <CarouselDestacados platos={platosDestacados} mostrarDetalles={false} />
          </section>
        )}
        </div>
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
