export default function CategoryIcon({ categoria, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center gap-3 cursor-pointer group"
    >
      <div className="category-icon w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-white group-hover:bg-opacity-90 rounded-full overflow-hidden">
        {/* Prioridad: imagen > icono > default */}
        {categoria.imagen ? (
          <img
            src={categoria.imagen}
            alt={categoria.nombre}
            className="w-full h-full object-cover"
          />
        ) : categoria.icono ? (
          <span className="text-4xl md:text-5xl">{categoria.icono}</span>
        ) : (
          <span className="text-4xl md:text-5xl">🍽️</span>
        )}
      </div>
      <p className="text-center font-medium text-sm md:text-base group-hover:opacity-70 transition-opacity">
        {categoria.nombre}
      </p>
    </div>
  );
}
