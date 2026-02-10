import { useState } from "react";
import { Share2, Star, MapPin } from "lucide-react";
import toast from "react-hot-toast";

export default function InteractiveSection({ restaurante }) {
  const savedRating = localStorage.getItem(`rating-${restaurante._id}`);
  const initialRating = savedRating ? parseInt(savedRating) : 0;

  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const shareUrl = window.location.href;
  const shareText = `${restaurante.nombre} - Menú Digital`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: restaurante.nombre,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // Usuario canceló
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copiado");
      } catch {
        toast.error("No se pudo copiar");
      }
    }
  };

  const handleRate = (value) => {
    setRating(value);
    localStorage.setItem(`rating-${restaurante._id}`, value.toString());
    toast.success(`Gracias por calificar`);
  };

  const openMaps = () => {
    const direccion = restaurante.contacto?.direccion;
    if (direccion?.calle) {
      const query = encodeURIComponent(
        `${direccion.calle}, ${direccion.ciudad || ""}`,
      );
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${query}`,
        "_blank",
      );
    }
  };

  const tieneDireccion = restaurante.contacto?.direccion?.calle;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center gap-8 md:gap-12 text-gray-500">
        {/* Compartir */}
        <button
          onClick={handleShare}
          className="flex items-center gap-2 hover:text-gray-700 transition-colors"
        >
          <Share2 size={18} />
          <span className="text-sm">Compartir</span>
        </button>

        <span className="text-gray-300">|</span>

        {/* Calificar */}
        <div className="flex items-center gap-2">
          <span className="text-sm">Calificar</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRate(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-0.5"
              >
                <Star
                  size={16}
                  className={`transition-colors ${
                    star <= (hoverRating || rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300 hover:text-yellow-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {tieneDireccion && (
          <>
            <span className="text-gray-300">|</span>

            {/* Ubicación */}
            <button
              onClick={openMaps}
              className="flex items-center gap-2 hover:text-gray-700 transition-colors"
            >
              <MapPin size={18} />
              <span className="text-sm">Ubicación</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
