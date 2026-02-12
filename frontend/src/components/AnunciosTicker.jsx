// components/AnunciosTicker.jsx
import { useEffect, useState } from "react";
import { getAnunciosPublicos } from "../services/api";

export default function AnunciosTicker({ restauranteId, categoriaId = null }) {
  const [anuncios, setAnuncios] = useState([]);

  // Inicializar desde localStorage
  const [tickerActivo] = useState(() => {
    const restauranteData = JSON.parse(
      localStorage.getItem("restauranteData") || "{}",
    );
    return restauranteData.tickerActivo ?? true;
  });

  // Cargar anuncios
  useEffect(() => {
    const fetchAnuncios = async () => {
      try {
        const res = await getAnunciosPublicos(restauranteId, categoriaId);
        setAnuncios(res.data.data);
      } catch (error) {
        console.error("Error loading anuncios:", error);
      }
    };

    fetchAnuncios();
  }, [restauranteId, categoriaId]);

  // Si ticker está desactivado o no hay anuncios, no mostrar nada
  if (!tickerActivo || anuncios.length === 0) return null;

  // Crear el contenido - MÁS SEPARACIÓN ENTRE ANUNCIOS
  const contenidoAnuncios = anuncios
    .map((anuncio) => `${anuncio.icono} ${anuncio.texto}`)
    .join("   •   •   •   "); // Más puntos y espacios

  // DUPLICAMOS MUCHAS VECES para que sea infinito y sin espacios vacíos
  const contenidoDuplicado = `${contenidoAnuncios}   •   •   •   ${contenidoAnuncios}   •   •   •   ${contenidoAnuncios}   •   •   •   ${contenidoAnuncios}   •   •   •   ${contenidoAnuncios}`;

  return (
    <div className="bg-cream border-y border-gray-100 py-2 relative overflow-hidden group">
      <div className="whitespace-nowrap animate-marquee inline-block">
        <span className="text-xs md:text-sm text-gray-500 font-medium tracking-wide px-2">
          {contenidoDuplicado}
        </span>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
