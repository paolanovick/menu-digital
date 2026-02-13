import {
  UtensilsCrossed,
  Smartphone,
  Leaf,
  Sparkles,
  ScanLine,
} from "lucide-react";

const benefits = [
  {
    icon: Smartphone,
    title: "Acceso Instantaneo",
    description: "Sin esperas, directo al menu desde tu celular",
  },
  {
    icon: Leaf,
    title: "Sin Apps",
    description: "Solo escanea el QR y navega la carta completa",
  },
  {
    icon: Sparkles,
    title: "Siempre Actualizado",
    description: "Platos, precios y disponibilidad al dia",
  },
];

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(168,49,50,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(168,49,50,0.06),transparent_60%)]" />

      {/* Hero section with background image */}
      <section className="relative flex flex-col items-center justify-center min-h-[65vh] px-4 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="./hero.jpg"
            alt=""
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* Floating icon */}
          <div className="mb-8 animate-bounce-slow">
            <div className="flex items-center justify-center w-20 h-20 rounded-full border border-wine/30 bg-wine/10 backdrop-blur-sm">
              <UtensilsCrossed className="w-9 h-9 text-wine-light" />
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight text-white mb-4">
            El Menu
          </h1>

          {/* Divider */}
          <div className="w-16 h-px bg-gradient-to-r from-wine/0 via-wine to-wine/0 mb-6" />

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-md">
            Escanea el codigo QR desde tu mesa
          </p>
          <p className="text-lg md:text-xl text-wine-light font-semibold mt-1 drop-shadow-[0_0_8px_rgba(199,72,73,0.4)]">
            y descubri una experiencia unica
          </p>
        </div>
      </section>

      {/* Benefit cards */}
      <section className="px-4 py-12 md:py-16 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="group relative flex flex-col items-center text-center p-6 rounded-xl border border-wine/15 bg-gray-800/60 backdrop-blur-sm hover:border-wine/40 hover:bg-gray-800/80 hover:shadow-[0_8px_30px_rgba(168,49,50,0.15)] transform hover:scale-[1.03] transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-700/60 mb-4 group-hover:bg-wine/15 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-wine-light" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-wine-light mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QR indicator */}
      <section className="px-4 pb-12 relative z-10">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-wine/20 bg-gray-800/80 backdrop-blur-sm shadow-[0_4px_15px_rgba(168,49,50,0.1)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wine-light opacity-40" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-wine-light" />
            </span>
            <ScanLine className="w-4 h-4 text-wine-light" />
            <p className="text-sm font-medium text-wine-light drop-shadow-[0_0_5px_rgba(199,72,73,0.4)]">
              Busca el codigo QR en tu mesa
            </p>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer */}
      <footer className="px-4 pb-8 pt-4 relative z-10">
        <p className="text-center text-xs text-gray-600">
          {
            "2026 elmenu.ar \u2014 Experiencia digital para restaurantes \u2014 Powered by conCodigoART"
          }
        </p>
      </footer>
    </div>
  );
}
