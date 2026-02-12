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

  // Crear el contenido del anuncio DUPLICADO 3 VECES para que sea continuo
  const contenidoAnuncios = anuncios
    .map((anuncio) => `${anuncio.icono} ${anuncio.texto}`)
    .join("   •   ");

  // Duplicamos el contenido 3 veces para que se vea continuo
  const contenidoDuplicado = `${contenidoAnuncios}   •   ${contenidoAnuncios}   •   ${contenidoAnuncios}   •   ${contenidoAnuncios}`;

  return (
    <div className="bg-cream border-y border-gray-100 py-3 relative overflow-hidden group">
      <div className="whitespace-nowrap animate-marquee group-hover:animation-pause inline-block">
        <span className="text-xs md:text-sm text-gray-400 font-medium tracking-widest uppercase px-4">
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
          animation: marquee 30s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
