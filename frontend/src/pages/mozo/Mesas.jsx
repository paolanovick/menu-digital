import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRestauranteBySlug, getMesasPublico, actualizarEstadoMesa } from "../../services/api";
import toast from "react-hot-toast";
import { LogOut, X, Unlock } from "lucide-react";

const ESTADO_COLOR = {
  libre: "bg-green-100 border-green-300 text-green-900 hover:bg-green-200 cursor-pointer",
  ocupada: "bg-red-100 border-red-300 text-red-900 hover:bg-red-200 cursor-pointer",
  reservada: "bg-yellow-100 border-yellow-300 text-yellow-900 cursor-not-allowed opacity-70",
};

const ESTADO_LABEL = { libre: "Libre", ocupada: "Ocupada", reservada: "Reservada" };

export default function MozoMesas() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [mesas, setMesas] = useState([]);
  const [restaurante, setRestaurante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null); // mesa ocupada clickeada
  const [liberando, setLiberando] = useState(false);
  const mozo = JSON.parse(localStorage.getItem("mozoData") || "{}");

  useEffect(() => {
    if (!mozo._id || mozo.rol !== "mozo") {
      navigate(`/mozo/${slug}`);
      return;
    }
    fetchData();
  }, [slug]);

  const fetchData = async () => {
    try {
      const resRest = await getRestauranteBySlug(slug);
      const rest = resRest.data.data;
      setRestaurante(rest);
      const resMesas = await getMesasPublico(rest._id);
      setMesas(resMesas.data.data);
    } catch {
      toast.error("Error al cargar mesas");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("mozoData");
    navigate(`/mozo/${slug}`);
  };

  const handleClickMesa = (mesa) => {
    if (mesa.estado === "reservada") return;
    if (mesa.estado === "libre") {
      navigate(`/mozo/${slug}/mesa/${mesa._id}`, { state: { mesa } });
    } else {
      // ocupada → mostrar opción de liberar
      setMesaSeleccionada(mesa);
    }
  };

  const handleLiberarMesa = async () => {
    setLiberando(true);
    try {
      await actualizarEstadoMesa(mesaSeleccionada._id, "libre");
      toast.success(`Mesa #${mesaSeleccionada.numero} liberada`);
      setMesaSeleccionada(null);
      await fetchData();
    } catch {
      toast.error("Error al liberar la mesa");
    } finally {
      setLiberando(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader"><div className="cup"><div className="cup-handle"></div><div className="smoke one"></div><div className="smoke two"></div><div className="smoke three"></div></div><div className="load">Cargando...</div></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url(/backgroundMantel.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "300px 300px",
      }}
    >
      <div className="absolute inset-0 bg-cream opacity-85 -z-10"></div>

      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div>
          <p className="font-bold text-lg text-gray-800">{restaurante?.nombre}</p>
          <p className="text-sm text-gray-500">Hola, {mozo.nombre}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-all"
        >
          <LogOut size={16} />
          <span className="text-sm">Salir</span>
        </button>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Leyenda */}
        <div className="flex items-center justify-center gap-4 mb-6 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span> Libre</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span> Ocupada</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span> Reservada</span>
        </div>

        {mesas.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🪑</div>
            <p className="text-gray-500">No hay mesas disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-w-lg mx-auto">
            {mesas.map((mesa) => (
              <button
                key={mesa._id}
                onClick={() => handleClickMesa(mesa)}
                disabled={mesa.estado === "reservada"}
                className={`border-2 rounded-xl p-3 text-center transition-all ${ESTADO_COLOR[mesa.estado]}`}
              >
                <p className="font-bold text-xl">#{mesa.numero}</p>
                {mesa.nombre && <p className="text-xs mt-1 opacity-75">{mesa.nombre}</p>}
                <p className="text-xs mt-1 font-medium">{ESTADO_LABEL[mesa.estado]}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal liberar mesa */}
      {mesaSeleccionada && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                Mesa #{mesaSeleccionada.numero}
                {mesaSeleccionada.nombre ? ` · ${mesaSeleccionada.nombre}` : ""}
              </h3>
              <button
                onClick={() => setMesaSeleccionada(null)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Esta mesa está <span className="font-semibold text-red-600">ocupada</span>. ¿Querés marcarla como libre?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setMesaSeleccionada(null)}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleLiberarMesa}
                disabled={liberando}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all disabled:opacity-50"
              >
                <Unlock size={16} />
                {liberando ? "Liberando..." : "Liberar mesa"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
