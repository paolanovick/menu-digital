import { useState } from "react";
import { Share2, Star, MapPin, Copy, Check } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaTwitter } from "react-icons/fa";
import toast from "react-hot-toast";

export default function InteractiveSection({ restaurante }) {
  // Inicializar desde localStorage directamente
  const savedRating = localStorage.getItem(`rating-${restaurante._id}`);
  const initialRating = savedRating ? parseInt(savedRating) : 0;

  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [hasRated, setHasRated] = useState(!!savedRating);
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // URL actual para compartir
  const shareUrl = window.location.href;
  const shareText = `¡Mirá el menú de ${restaurante.nombre}! 🍽️`;

  // Funciones de compartir
  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      "_blank",
    );
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank",
    );
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank",
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("¡Link copiado!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("No se pudo copiar el link");
    }
  };

  // Función de calificar
  const handleRate = (value) => {
    setRating(value);
    setHasRated(true);
    localStorage.setItem(`rating-${restaurante._id}`, value.toString());
    toast.success(`¡Gracias por tu calificación de ${value} estrellas!`);
  };

  // Abrir ubicación en Google Maps
  const openMaps = () => {
    const direccion = restaurante.contacto?.direccion;
    if (direccion) {
      const query = encodeURIComponent(
        `${direccion.calle || ""}, ${direccion.ciudad || ""}, ${direccion.provincia || ""}`,
      );
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${query}`,
        "_blank",
      );
    } else {
      toast.error("No hay dirección disponible");
    }
  };

  const tieneDireccion = restaurante.contacto?.direccion?.calle;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8">
          <h3 className="text-xl font-bold text-center text-gray-800 mb-6">
            ¿Te gustó nuestro menú?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Compartir */}
            <div className="text-center">
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="w-full flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-all group"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Share2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-700">Compartir</span>
                </button>

                {/* Menú de compartir */}
                {showShareMenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-xl p-3 z-50 min-w-[200px]">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={shareWhatsApp}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors text-left"
                      >
                        <FaWhatsapp className="text-green-600" size={20} />
                        <span className="text-sm font-medium">WhatsApp</span>
                      </button>
                      <button
                        onClick={shareFacebook}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors text-left"
                      >
                        <FaFacebook className="text-blue-600" size={20} />
                        <span className="text-sm font-medium">Facebook</span>
                      </button>
                      <button
                        onClick={shareTwitter}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-sky-50 transition-colors text-left"
                      >
                        <FaTwitter className="text-sky-500" size={20} />
                        <span className="text-sm font-medium">Twitter</span>
                      </button>
                      <button
                        onClick={copyLink}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        {copied ? (
                          <Check className="text-green-600" size={20} />
                        ) : (
                          <Copy className="text-gray-600" size={20} />
                        )}
                        <span className="text-sm font-medium">
                          {copied ? "¡Copiado!" : "Copiar link"}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Calificar */}
            <div className="text-center">
              <div className="flex flex-col items-center gap-2 p-4">
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star
                    className="w-6 h-6 text-yellow-500"
                    fill={hasRated ? "currentColor" : "none"}
                  />
                </div>
                <span className="font-medium text-gray-700">Calificar</span>

                {/* Estrellas */}
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRate(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        size={28}
                        className={`transition-colors ${
                          star <= (hoverRating || rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {hasRated && (
                  <p className="text-sm text-gray-500 mt-1">
                    Tu calificación: {rating}/5
                  </p>
                )}
              </div>
            </div>

            {/* Ubicación */}
            <div className="text-center">
              <button
                onClick={openMaps}
                disabled={!tieneDireccion}
                className="w-full flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <span className="font-medium text-gray-700">Ubicación</span>
                {tieneDireccion && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {restaurante.contacto.direccion.calle}
                  </p>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay para cerrar menú de compartir */}
      {showShareMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
}
