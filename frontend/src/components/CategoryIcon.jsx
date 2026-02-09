export default function CategoryIcon({ categoria, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center gap-3 cursor-pointer group"
    >
      <div className="category-icon w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-white group-hover:bg-opacity-90">
        <span className="text-3xl md:text-4xl">
          {/* Icono - puede ser emoji o imagen */}
          {categoria.icono?.startsWith("http") ||
          categoria.icono?.startsWith("/") ? (
            <div className="w-16 h-16 mx-auto mb-3">
              <img
                src={categoria.icono}
                alt={categoria.nombre}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="text-5xl mb-3">{categoria.icono || "🍽️"}</div>
          )}
        </span>
      </div>
      <p className="text-center font-medium text-sm md:text-base group-hover:opacity-70 transition-opacity">
        {categoria.nombre}
      </p>
    </div>
  );
}
