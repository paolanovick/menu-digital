import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRestauranteBySlug, getMesasPublico } from "../../services/api";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";

const ESTADO_COLOR = {
  libre: "bg-green-100 border-green-300 text-green-900 hover:bg-green-200 cursor-pointer",
  ocupada: "bg-red-100 border-red-300 text-red-900 cursor-not-allowed opacity-70",
  reservada: "bg-yellow-100 border-yellow-300 text-yellow-900 cursor-not-allowed opacity-70",
};

const ESTADO_LABEL = { libre: "Libre", ocupada: "Ocupada", reservada: "Reservada" };

export default function MozoMesas() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [mesas, setMesas] = useState([]);
  const [restaurante, setRestaurante] = useState(null);
  const [loading, setLoading] = useState(true);
  const mozo = JSON.parse(localStorage.getItem("mozoData") || "{}");

  useEffect(() => {
    // Verificar que sea mozo
    if (!mozo._id || mozo.rol !== "mozo") {
      navigate(`/mozo/${slug}`);
      return;
    }

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
    fetchData();
  }, [slug]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("mozoData");
    navigate(`/mozo/${slug}`);
  };

  const handleSeleccionarMesa = (mesa) => {
    if (mesa.estado !== "libre") return;
    navigate(`/mozo/${slug}/mesa/${mesa._id}`, { state: { mesa } });
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
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Seleccioná tu mesa
        </h2>

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
                onClick={() => handleSeleccionarMesa(mesa)}
                disabled={mesa.estado !== "libre"}
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
    </div>
  );
}
