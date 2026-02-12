// components/AnunciosTicker.jsx
import { useEffect, useState } from "react";
import { getAnunciosPublicos } from "../services/api";

export default function AnunciosTicker({ restauranteId, categoriaId = null }) {
  const [anuncios, setAnuncios] = useState([]);

  const [tickerActivo] = useState(() => {
    const restauranteData = JSON.parse(
      localStorage.getItem("restauranteData") || "{}",
    );
    return restauranteData.tickerActivo ?? true;
  });

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

  if (!tickerActivo || anuncios.length === 0) return null;

  // Crear el contenido con MÁS ESPACIOS Y SEPARADORES MÁS GRANDES
  const contenidoBase = anuncios
    .map((anuncio) => `${anuncio.icono} ${anuncio.texto}`)
    .join("       •       •       •       "); // Muchos espacios entre los puntos

  // REPETIR 40 VECES
  const contenidoMasivo = Array(40)
    .fill(contenidoBase)
    .join("       •       •       •       ");

  return (
    <div className="bg-cream border-y border-gray-100/50 py-2 relative overflow-hidden w-full">
      <div className="inline-flex whitespace-nowrap animate-marquee">
        <span className="text-xs md:text-sm text-gray-400/80 font-light tracking-wide px-2">
          {contenidoMasivo}
        </span>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 180s linear infinite;
        }
      `}</style>
    </div>
  );
}
