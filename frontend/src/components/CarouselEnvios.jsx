import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../context/useCart";

export default function CarouselEnvios({ productos }) {
  const { addToCart } = useCart();
  const [index, setIndex] = useState(0);

  const itemsPerView = 4;

  const maxIndex = Math.max(0, Math.ceil(productos.length / itemsPerView) - 1);

  const next = () => {
    setIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const visible = productos.slice(
    index * itemsPerView,
    index * itemsPerView + itemsPerView,
  );

  if (!productos || productos.length === 0) return null;

  return (
    <div className="relative">
      {/* Flecha izquierda */}
      {index > 0 && (
        <button
          onClick={prev}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
        >
          <ChevronLeft className="text-wine" />
        </button>
      )}

      {/* Flecha derecha */}
      {index < maxIndex && (
        <button
          onClick={next}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
        >
          <ChevronRight className="text-wine" />
        </button>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
        {visible.map((producto) => (
          <div
            key={producto._id}
            className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all overflow-hidden flex flex-col"
          >
            {/* Imagen */}
            <div className="relative h-40 bg-gray-100">
              {producto.imagen ? (
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl">
                  🍽️
                </div>
              )}
            </div>

            {/* Contenido */}
            <div className="p-4 flex flex-col flex-1">
              <h4 className="font-display text-lg font-semibold mb-1 line-clamp-1">
                {producto.nombre}
              </h4>

              {producto.descripcion && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {producto.descripcion}
                </p>
              )}

              <div className="mt-auto flex items-center justify-between">
                <span className="text-lg font-semibold text-wine">
                  ${producto.precio.toLocaleString("es-AR")}
                </span>

                <button
                  onClick={() => addToCart(producto)}
                  className="bg-wine text-white text-sm px-4 py-2 rounded-full hover:bg-wine-dark transition-colors"
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
