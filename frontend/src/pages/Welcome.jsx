import { useState } from "react";
import {
  UtensilsCrossed,
  Smartphone,
  Leaf,
  Sparkles,
  ScanLine,
  QrCode,
  ShoppingBag,
  ChefHat,
  LayoutDashboard,
  ArrowRight,
  Zap,
  Globe,
} from "lucide-react";
import QRScanner from "../components/QRScanner";

const benefits = [
  {
    icon: Smartphone,
    title: "Acceso Instantaneo",
    description: "Tocá para escanear el QR en tu mesa",
    action: "camera",
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

const features = [
  {
    icon: QrCode,
    title: "Menú Digital con QR",
    description: "Tus clientes escanean el QR y acceden a la carta completa desde el celular. Sin apps, sin descargas.",
    color: "from-violet-500/20 to-violet-500/5",
    border: "border-violet-500/30",
    iconColor: "text-violet-400",
    image: "/tucomida.png",
  },
  {
    icon: ShoppingBag,
    title: "Delivery con Carrito",
    description: "Sistema de pedidos online con carrito, checkout y envío directo por WhatsApp al restaurante.",
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    image: "/carrito.png",
  },
  {
    icon: ChefHat,
    title: "Mozos y Mesas",
    description: "Tus mozos toman pedidos desde el celular en cada mesa. Control de estado en tiempo real.",
    color: "from-amber-500/20 to-amber-500/5",
    border: "border-amber-500/30",
    iconColor: "text-amber-400",
    image: "/mozo.png",
  },
  {
    icon: LayoutDashboard,
    title: "Panel de Administración",
    description: "Gestioná platos, categorías, precios y configuración desde un dashboard simple e intuitivo.",
    color: "from-sky-500/20 to-sky-500/5",
    border: "border-sky-500/30",
    iconColor: "text-sky-400",
    image: "/admin.png",
  },
  {
    icon: Globe,
    title: "Tu URL propia",
    description: "Cada restaurante tiene su propia dirección: elmenu.ar/tu-restaurante. Lista para compartir.",
    color: "from-pink-500/20 to-pink-500/5",
    border: "border-pink-500/30",
    iconColor: "text-pink-400",
    image: "/tucomida.png",
  },
  {
    icon: Zap,
    title: "Carta siempre actualizada",
    description: "En minutos tu menú está online. Cargás tus platos, configurás y ya podés compartirlo.",
    color: "from-wine/20 to-wine/5",
    border: "border-wine/30",
    iconColor: "text-wine-light",
    image: "/platos.png",
  },
];

export default function Welcome() {
  const [showScanner, setShowScanner] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);

  const handleOpenScanner = async () => {
    try {
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
      }
      setMediaStream(stream);
      setShowScanner(true);
    } catch {
      setShowScanner(true);
    }
  };

  const handleScan = (qrData) => {
    if (qrData.startsWith("http")) {
      try {
        const url = new URL(qrData);
        const allowedDomains = ["elmenu.ar", "www.elmenu.ar", window.location.hostname];
        if (allowedDomains.includes(url.hostname)) {
          window.location.href = qrData;
        } else {
          alert("QR no reconocido. Solo se aceptan códigos QR de este sistema.");
        }
      } catch {
        alert("QR inválido.");
      }
    } else {
      alert(`QR detectado: ${qrData}`);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(168,49,50,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(168,49,50,0.06),transparent_60%)]" />

        {/* ── HERO ── */}
        <section className="relative flex flex-col items-center justify-center min-h-[65vh] px-4 overflow-hidden">
          <div className="absolute inset-0">
            <img src="./hero.jpg" alt="" className="h-full w-full object-cover" crossOrigin="anonymous" />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
            <div className="mb-8 animate-bounce-slow">
              <div className="flex items-center justify-center w-20 h-20 rounded-full border border-wine/30 bg-wine/10 backdrop-blur-sm">
                <UtensilsCrossed className="w-9 h-9 text-wine-light" />
              </div>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.15em] uppercase text-white mb-4">
              El Menú
            </h1>
            <div className="w-16 h-px bg-gradient-to-r from-wine/0 via-wine to-wine/0 mb-6" />
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-md">
              Escanea el código QR desde tu mesa
            </p>
            <p className="text-lg md:text-xl text-wine-light font-semibold mt-1 drop-shadow-[0_0_8px_rgba(199,72,73,0.4)]">
              y descubrí una experiencia única
            </p>
          </div>
        </section>

        {/* ── BENEFIT CARDS ── */}
        <section className="px-4 py-12 md:py-16 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    onClick={benefit.action === "camera" ? handleOpenScanner : undefined}
                    className={`group relative flex flex-col items-center text-center p-6 rounded-xl border border-wine/15 bg-gray-800/60 backdrop-blur-sm hover:border-wine/40 hover:bg-gray-800/80 hover:shadow-[0_8px_30px_rgba(168,49,50,0.15)] transform hover:scale-[1.03] transition-all duration-300 ${benefit.action === "camera" ? "cursor-pointer" : ""}`}
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-700/60 mb-4 group-hover:bg-wine/15 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-wine-light" />
                    </div>
                    <h3 className="font-serif text-lg font-light tracking-wide text-wine-light mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{benefit.description}</p>
                    {benefit.action === "camera" && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-wine rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                        📷
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── QR BUTTON ── */}
        <section className="px-4 pb-12 relative z-10">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <button
              onClick={handleOpenScanner}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-wine/20 bg-gray-800/80 backdrop-blur-sm shadow-[0_4px_15px_rgba(168,49,50,0.1)] hover:bg-wine/20 transition-colors"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wine-light opacity-40" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-wine-light" />
              </span>
              <ScanLine className="w-4 h-4 text-wine-light" />
              <p className="text-sm font-medium text-wine-light drop-shadow-[0_0_5px_rgba(199,72,73,0.4)]">
                Busca el código QR en tu mesa
              </p>
            </button>
          </div>
        </section>

        {/* ── DIVISOR ── */}
        <div className="relative z-10 mx-4 border-t border-gray-800" />

        {/* ── MARKETING PARA RESTAURANTES ── */}
        <section className="relative z-10 px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">

            {/* Título */}
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-wine-light/70 mb-4 px-4 py-1.5 rounded-full border border-wine/20 bg-wine/5">
                Para restaurantes
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-white mt-4 mb-4">
                Llevá tu carta al siguiente nivel
              </h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
                Una plataforma completa para digitalizar tu restaurante. Sin complicaciones, sin apps, desde el primer día.
              </p>
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className={`relative p-5 rounded-2xl border ${f.border} bg-gradient-to-br ${f.color} backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 group flex flex-col`}
                  >
                    {/* Phone mockup */}
                    <div className="flex justify-center mb-5">
                      <div className="relative w-32 h-56">
                        {/* Phone frame */}
                        <div className="absolute inset-0 rounded-[20px] border-2 border-gray-600 bg-gray-900 shadow-2xl overflow-hidden">
                          {/* Notch */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-gray-900 rounded-b-xl z-10" />
                          {/* Screen */}
                          <img
                            src={f.image}
                            alt={f.title}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        {/* Glow */}
                        <div className={`absolute inset-0 rounded-[20px] blur-xl opacity-20 bg-gradient-to-b ${f.color} -z-10 scale-110`} />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-gray-800/80 flex items-center justify-center flex-shrink-0">
                        <Icon className={`w-4 h-4 ${f.iconColor}`} />
                      </div>
                      <h3 className="text-white font-semibold text-sm">{f.title}</h3>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{f.description}</p>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="text-center">
              <a
                href="https://landing.elmenu.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-wine hover:bg-wine/90 text-white font-semibold text-base shadow-[0_0_30px_rgba(168,49,50,0.3)] hover:shadow-[0_0_40px_rgba(168,49,50,0.5)] transition-all duration-300 transform hover:scale-[1.03]"
              >
                Conocé más sobre elmenu.ar
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-gray-600 text-xs mt-4">Sin compromiso · Activación inmediata</p>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="px-4 pb-8 pt-4 relative z-10 border-t border-gray-800/50">
          <p className="text-center text-xs text-gray-600">
            2026 elmenu.ar — Experiencia digital para restaurantes — Powered by conCodigoART
          </p>
        </footer>
      </div>

      {showScanner && (
        <QRScanner
          stream={mediaStream}
          onClose={() => {
            setShowScanner(false);
            setMediaStream(null);
          }}
          onScan={handleScan}
        />
      )}
    </>
  );
}
