// src/components/PlatoCard.jsx
import { useState } from "react";
import { useCart } from "../context/useCart"; 

export default function PlatoCard({ plato, showBuyButton }) {
  // 👈 NUEVO: `showBuyButton`
  const { addToCart } = useCart(); // Añade esto si aún no lo tienes en este archivo
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-card
        transition-all
        hover:shadow-card-hover
    "
    >
      {/* Imagen */}
      <div
        className="
          relative
          h-48
          bg-gray-100
          overflow-hidden
      "
      >
        {plato.imagen && !imageError ? (
          <img
            src={plato.imagen}
            alt={plato.nombre}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            🍽️
          </div>
        )}

        {/* Badges y Etiquetas (sin cambios) */}
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

        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {plato.etiquetas?.vegetariano && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              🌱 Vegetariano
            </span>
          )}
          {plato.etiquetas?.vegano && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              🌿 Vegano
            </span>
          )}
          {plato.etiquetas?.sinGluten && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              🌾 Sin Gluten
            </span>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3
          className="
            font-display
            text-lg
            md:text-xl
            font-semibold
            tracking-tight
            mb-2
            line-clamp-1
        "
        >
          {plato.nombre}
        </h3>

        {plato.descripcion && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {plato.descripcion}
          </p>
        )}

        {/* Ingredientes, Alérgenos... (sin cambios) */}
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

        {/* Footer: Precio + Botón comprar (condicional) */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t">
          <span className="text-lg font-semibold text-wine">
            ${plato.precio.toLocaleString("es-AR")}
          </span>

          {/* Mostrar botón solo si showBuyButton es true */}
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
