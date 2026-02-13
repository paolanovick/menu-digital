export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="text-center px-4">
        <div className="text-8xl mb-6">🍽️</div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          El Menú
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Escanea el código QR desde tu mesa
          <br />
          para ver el menú digital
        </p>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <p className="text-gray-500">
            📱 Acceso instantáneo
            <br />
            🌱 Sin apps ni descargas
            <br />✨ Menú siempre actualizado
          </p>
        </div>
      </div>
    </div>
  );
}
