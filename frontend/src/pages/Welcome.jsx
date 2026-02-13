export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Efecto de partículas/estrellas (opcional) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,49,50,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(168,49,50,0.1),transparent_50%)]"></div>

      {/* Contenedor principal con efecto glassmorphism oscuro */}
      <div className="max-w-3xl w-full bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-wine/20 p-8 md:p-12 relative z-10">
        {/* Header con ícono animado */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="text-8xl md:text-9xl mb-4 animate-bounce-slow drop-shadow-[0_0_15px_rgba(168,49,50,0.5)]">
              🍽️
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-wine/0 via-wine to-wine/0 rounded-full"></div>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold bg-gradient-to-r from-wine via-wine-light to-wine bg-clip-text text-transparent mb-4 drop-shadow-[0_0_10px_rgba(168,49,50,0.3)]">
            El Menú
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-wine to-wine-light mx-auto rounded-full mb-6"></div>

          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Escanea el código QR desde tu mesa
            <br />
            <span className="text-wine-light font-semibold drop-shadow-[0_0_8px_rgba(199,72,73,0.5)]">
              y descubrí una experiencia única
            </span>
          </p>
        </div>

        {/* Tarjetas de beneficios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800/80 rounded-xl p-4 shadow-[0_8px_20px_rgba(0,0,0,0.5)] border border-wine/20 transform hover:scale-105 hover:border-wine/40 hover:shadow-[0_8px_30px_rgba(168,49,50,0.3)] transition-all duration-300 backdrop-blur-sm">
            <div className="text-3xl mb-2 drop-shadow-[0_0_8px_rgba(168,49,50,0.5)]">
              📱
            </div>
            <h3 className="font-display font-semibold text-wine-light mb-1">
              Acceso Instantáneo
            </h3>
            <p className="text-sm text-gray-400">
              Sin esperas, directo al menú
            </p>
          </div>

          <div className="bg-gray-800/80 rounded-xl p-4 shadow-[0_8px_20px_rgba(0,0,0,0.5)] border border-wine/20 transform hover:scale-105 hover:border-wine/40 hover:shadow-[0_8px_30px_rgba(168,49,50,0.3)] transition-all duration-300 backdrop-blur-sm">
            <div className="text-3xl mb-2 drop-shadow-[0_0_8px_rgba(168,49,50,0.5)]">
              🌱
            </div>
            <h3 className="font-display font-semibold text-wine-light mb-1">
              Sin Apps
            </h3>
            <p className="text-sm text-gray-400">Solo escaneá y navegá</p>
          </div>

          <div className="bg-gray-800/80 rounded-xl p-4 shadow-[0_8px_20px_rgba(0,0,0,0.5)] border border-wine/20 transform hover:scale-105 hover:border-wine/40 hover:shadow-[0_8px_30px_rgba(168,49,50,0.3)] transition-all duration-300 backdrop-blur-sm">
            <div className="text-3xl mb-2 drop-shadow-[0_0_8px_rgba(168,49,50,0.5)]">
              ✨
            </div>
            <h3 className="font-display font-semibold text-wine-light mb-1">
              Siempre Actualizado
            </h3>
            <p className="text-sm text-gray-400">Platos y precios al día</p>
          </div>
        </div>

        {/* Footer con instrucciones */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gray-800 px-6 py-3 rounded-full border border-wine/20 shadow-[0_4px_15px_rgba(168,49,50,0.2)]">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wine-light opacity-40"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-wine-light"></span>
            </span>
            <p className="text-wine-light font-medium drop-shadow-[0_0_5px_rgba(199,72,73,0.5)]">
              Buscá el código QR en tu mesa
            </p>
          </div>
        </div>

        {/* Decoración de fondo mejorada */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-wine/10 rounded-full -translate-x-32 -translate-y-32 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-wine/10 rounded-full translate-x-40 translate-y-40 blur-3xl"></div>
      </div>

      {/* Créditos */}
      <p className="text-sm text-gray-600 mt-8 relative z-10">
        © 2026 elmenu.ar - Experiencia digital para restaurantes - Powered by conCodigoART
      </p>
    </div>
  );
}
