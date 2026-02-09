import { useEffect, useState } from "react";
import { getAnunciosPublicos } from "../services/api";
import TextScrollMarquee from "./ui/TextScrollMarquee";

export default function AnunciosTicker({ restauranteId, categoriaId = null }) {
  const [anuncios, setAnuncios] = useState([]);

  // Inicializar desde localStorage (sin useEffect)
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

  // Combinar todos los anuncios en un solo texto
  const textoCompleto = anuncios
    .map((anuncio) => `${anuncio.icono} ${anuncio.texto}`)
    .join("   •   ");

  return (
    <div className="bg-cream border-y border-gray-100 py-3 relative overflow-hidden">
      <TextScrollMarquee
        baseVelocity={5}
        direction="right"
        className="text-xs md:text-sm text-gray-400 font-medium tracking-widest uppercase"
        scrollDependent={false}
        delay={500}
      >
        {textoCompleto}
      </TextScrollMarquee>
    </div>
  );
}
