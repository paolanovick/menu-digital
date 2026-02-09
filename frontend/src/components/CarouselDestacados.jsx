import { useEffect, useRef, useState } from "react";

export default function CarouselDestacados({ platos }) {
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // ⬅️ HOOKS SIEMPRE ARRIBA
  useEffect(() => {
    if (!platos || platos.length === 0) return;

    const track = trackRef.current;
    if (!track) return;

    let position = 0;
    let animationId;
    const speed = 0.4;

    const animate = () => {
      if (!isPaused) {
        position -= speed;

        if (Math.abs(position) >= track.scrollWidth / 2) {
          position = 0;
        }

        track.style.transform = `translateX(${position}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused, platos]);

  // ⬅️ EL RETURN VA DESPUÉS DE LOS HOOKS
  if (!platos || platos.length === 0) return null;

  const items = [...platos, ...platos];

  return (
    <div
      className="relative overflow-hidden mb-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div ref={trackRef} className="flex gap-6 w-max will-change-transform">
        {items.map((plato, index) => (
          <div
            key={`${plato._id}-${index}`}
            className="min-w-[260px] sm:min-w-[280px] lg:min-w-[300px]"
          >
            <div className="bg-white rounded-3xl shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300">
              <div className="relative h-40 bg-gray-100 overflow-hidden">
                {plato.imagen ? (
                  <img
                    src={plato.imagen}
                    alt={plato.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    🍽️
                  </div>
                )}

                {plato.destacado && (
                  <div className="absolute top-2 right-2 bg-wine text-white text-xs px-2 py-1 rounded-full font-medium">
                    Destacado
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-display text-lg font-semibold tracking-tight mb-1 line-clamp-1">
                  {plato.nombre}
                </h3>

                {plato.descripcion && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {plato.descripcion}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-wine">
                    ${plato.precio.toLocaleString("es-AR")}
                  </span>

                  {!plato.disponible && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      Agotado
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
