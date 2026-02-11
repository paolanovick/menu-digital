import { useState } from "react";
import { useCart } from "../context/useCart";

export default function PlatoCard({ plato, showBuyButton }) {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-card transition-all hover:shadow-card-hover flex flex-col">
      {/* Imagen - SOLO IMAGEN, SIN BADGES */}
      <div className="relative bg-gray-100 aspect-[4/3]">
        {plato.imagen && !imageError ? (
          <img
            src={plato.imagen}
            alt={plato.nombre}
            className="w-full h-full object-contain p-2"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            🍽️
          </div>
        )}

        {/* ÚNICAMENTE badges de destacado, nuevo y agotado */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {plato.destacado && (
            <span className="bg-wine text-white text-xs px-2 py-1 rounded-full font-medium">
              ⭐ Destacado
            </span>
          )}
          {plato.etiquetas?.nuevo && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              🆕 Nuevo
            </span>
          )}
          {!plato.disponible && (
            <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Agotado
            </span>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-display text-lg md:text-xl font-semibold tracking-tight mb-2 line-clamp-1">
          {plato.nombre}
        </h3>

        {/* DESCRIPCIÓN CON BADGES DE DIETAS */}
        <div className="mb-3 space-y-2">
          {/* Badges de dietas (vegetariano, vegano, sin gluten) */}
          <div className="flex flex-wrap gap-1">
            {plato.etiquetas?.vegetariano && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full inline-flex items-center gap-1">
                🌱 Vegetariano
              </span>
            )}
            {plato.etiquetas?.vegano && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full inline-flex items-center gap-1">
                🌿 Vegano
              </span>
            )}
            {plato.etiquetas?.sinGluten && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full inline-flex items-center gap-1">
                🌾 Sin Gluten
              </span>
            )}
          </div>

          {/* Descripción del plato */}
          {plato.descripcion && (
            <p className="text-sm text-gray-600">{plato.descripcion}</p>
          )}
        </div>

        {plato.ingredientes && plato.ingredientes.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Ingredientes:</p>
            <p className="text-xs text-gray-600 line-clamp-1">
              {plato.ingredientes.join(", ")}
            </p>
          </div>
        )}

        {plato.alergenos && plato.alergenos.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">⚠️ Alérgenos:</p>
            <div className="flex flex-wrap gap-1">
              {plato.alergenos.map((alergeno, index) => (
                <span
                  key={index}
                  className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded"
                >
                  {alergeno}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer: Precio + Botón */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t">
          <span className="text-lg font-semibold text-wine">
            ${plato.precio.toLocaleString("es-AR")}
          </span>

          {showBuyButton && (
            <button
              onClick={() => addToCart(plato)}
              className="bg-wine text-white text-sm px-4 py-2 rounded-full hover:bg-wine-dark transition-colors"
            >
              Comprar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
