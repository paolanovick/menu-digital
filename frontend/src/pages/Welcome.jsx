export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wine/5 via-cream to-wine/5 flex flex-col items-center justify-center p-4">
      {/* Contenedor principal con efecto glassmorphism */}
      <div className="max-w-3xl w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-card border border-wine/10 p-8 md:p-12">
        {/* Header con ícono animado */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="text-8xl md:text-9xl mb-4 animate-bounce-slow">
              🍽️
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-wine/0 via-wine to-wine/0 rounded-full"></div>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold bg-gradient-to-r from-wine to-wine-dark bg-clip-text text-transparent mb-4">
            El Menú
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-wine to-wine-dark mx-auto rounded-full mb-6"></div>

          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Escanea el código QR desde tu mesa
            <br />
            <span className="text-wine font-semibold">
              y descubrí una experiencia única
            </span>
          </p>
        </div>

        {/* Tarjetas de beneficios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-card hover:shadow-card-hover border border-gray-100 transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl mb-2">📱</div>
            <h3 className="font-display font-semibold text-wine mb-1">
              Acceso Instantáneo
            </h3>
            <p className="text-sm text-gray-500">
              Sin esperas, directo al menú
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-card hover:shadow-card-hover border border-gray-100 transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl mb-2">🌱</div>
            <h3 className="font-display font-semibold text-wine mb-1">
              Sin Apps
            </h3>
            <p className="text-sm text-gray-500">Solo escaneá y navegá</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-card hover:shadow-card-hover border border-gray-100 transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl mb-2">✨</div>
            <h3 className="font-display font-semibold text-wine mb-1">
              Siempre Actualizado
            </h3>
            <p className="text-sm text-gray-500">Platos y precios al día</p>
          </div>
        </div>

        {/* Footer con instrucciones */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-wine/5 px-6 py-3 rounded-full border border-wine/10">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wine opacity-40"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-wine"></span>
            </span>
            <p className="text-wine font-medium">
              Buscá el código QR en tu mesa
            </p>
          </div>
        </div>

        {/* Decoración de fondo */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-wine/5 rounded-full -translate-x-16 -translate-y-16 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-wine/5 rounded-full translate-x-20 translate-y-20 blur-2xl"></div>
      </div>

      {/* Créditos */}
      <p className="text-sm text-gray-400 mt-8">
        © 2025 El Menú - Experiencia digital para restaurantes
      </p>
    </div>
  );
}
