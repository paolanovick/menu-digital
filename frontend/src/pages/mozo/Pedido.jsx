import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getRestauranteBySlug, getCategorias, getPlatos, crearPedido, actualizarEstadoMesa } from "../../services/api";
import toast from "react-hot-toast";
import { ArrowLeft, Plus, Minus, SendHorizontal, Trash2 } from "lucide-react";

export default function MozoPedido() {
  const { slug, mesaId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const mesa = location.state?.mesa;
  const mozo = JSON.parse(localStorage.getItem("mozoData") || "{}");

  const [restaurante, setRestaurante] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [platos, setPlatos] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [notas, setNotas] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mozo._id || mozo.rol !== "mozo") {
      navigate(`/mozo/${slug}`);
      return;
    }
    const fetchData = async () => {
      try {
        const resRest = await getRestauranteBySlug(slug);
        const rest = resRest.data.data;
        setRestaurante(rest);
        const resCats = await getCategorias(rest._id);
        const cats = resCats.data.data;
        setCategorias(cats);
        if (cats.length > 0) {
          setCategoriaActiva(cats[0]._id);
          const resPlatos = await getPlatos(rest._id, cats[0]._id);
          setPlatos(resPlatos.data.data.filter((p) => p.disponible));
        }
      } catch {
        toast.error("Error al cargar menú");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const handleCategoriaChange = async (catId) => {
    setCategoriaActiva(catId);
    try {
      const res = await getPlatos(restaurante._id, catId);
      setPlatos(res.data.data.filter((p) => p.disponible));
    } catch {
      toast.error("Error al cargar platos");
    }
  };

  const agregarAlCarrito = (plato) => {
    setCarrito((prev) => {
      const existe = prev.find((i) => i._id === plato._id);
      if (existe) return prev.map((i) => i._id === plato._id ? { ...i, cantidad: i.cantidad + 1 } : i);
      return [...prev, { _id: plato._id, nombre: plato.nombre, precio: plato.precio, cantidad: 1 }];
    });
  };

  const actualizarCantidad = (id, cantidad) => {
    if (cantidad <= 0) {
      setCarrito((prev) => prev.filter((i) => i._id !== id));
    } else {
      setCarrito((prev) => prev.map((i) => i._id === id ? { ...i, cantidad } : i));
    }
  };

  const totalPedido = carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

  const cantidadEnCarrito = (platoId) => {
    const item = carrito.find((i) => i._id === platoId);
    return item ? item.cantidad : 0;
  };

  const handleEnviarPedido = async () => {
    if (carrito.length === 0) {
      toast.error("Agregá al menos un ítem");
      return;
    }
    setEnviando(true);
    try {
      // Guardar pedido en BD
      const pedidoRes = await crearPedido({
        restauranteId: restaurante._id,
        tipo: "mesa",
        mesaId,
        mesaNumero: mesa?.numero,
        mozoId: mozo._id,
        mozoNombre: mozo.nombre,
        items: carrito.map((i) => ({
          platoId: i._id,
          nombre: i.nombre,
          precio: i.precio,
          cantidad: i.cantidad,
          subtotal: i.precio * i.cantidad,
        })),
        total: totalPedido,
        notas,
      });

      // Marcar mesa como ocupada
      await actualizarEstadoMesa(mesaId, "ocupada");

      // Enviar a WhatsApp
      const whatsapp = restaurante.contacto?.whatsapp;
      if (whatsapp) {
        const pedido = pedidoRes.data.data;
        let msg = `🪑 *PEDIDO MESA #${mesa?.numero}*\n`;
        msg += `Mozo: ${mozo.nombre}\n`;
        msg += `Pedido #${pedido.numeroOrden}\n\n`;
        carrito.forEach((i) => {
          msg += `• ${i.cantidad}x ${i.nombre} - $${(i.precio * i.cantidad).toLocaleString("es-AR")}\n`;
        });
        msg += `\n*TOTAL: $${totalPedido.toLocaleString("es-AR")}*`;
        if (notas) msg += `\n\n📝 ${notas}`;
        window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
      }

      toast.success("Pedido enviado correctamente");
      navigate(`/mozo/${slug}/mesas`);
    } catch {
      toast.error("Error al enviar pedido");
    } finally {
      setEnviando(false);
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate(`/mozo/${slug}/mesas`)} className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={22} />
        </button>
        <div>
          <p className="font-bold text-gray-800">{restaurante?.nombre}</p>
          <p className="text-sm text-gray-500">Mesa #{mesa?.numero}{mesa?.nombre ? ` · ${mesa.nombre}` : ""}</p>
        </div>
        {carrito.length > 0 && (
          <div className="ml-auto bg-wine text-white text-xs font-bold px-3 py-1 rounded-full">
            {carrito.reduce((a, i) => a + i.cantidad, 0)} ítems
          </div>
        )}
      </div>

      {/* Categorías */}
      <div className="bg-white border-b overflow-x-auto flex px-2 py-2 gap-2">
        {categorias.map((cat) => (
          <button
            key={cat._id}
            onClick={() => handleCategoriaChange(cat._id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              categoriaActiva === cat._id
                ? "bg-wine text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat.icono && <span className="mr-1">{cat.icono}</span>}
            {cat.nombre}
          </button>
        ))}
      </div>

      {/* Platos */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {platos.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No hay platos en esta categoría</div>
        ) : (
          platos.map((plato) => {
            const enCarrito = cantidadEnCarrito(plato._id);
            return (
              <div key={plato._id} className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm">
                {plato.imagen ? (
                  <img src={plato.imagen} alt={plato.nombre} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">🍽️</div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-sm truncate">{plato.nombre}</p>
                  <p className="text-wine font-bold text-sm">${plato.precio.toLocaleString("es-AR")}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {enCarrito > 0 ? (
                    <>
                      <button
                        onClick={() => actualizarCantidad(plato._id, enCarrito - 1)}
                        className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-all"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center font-bold text-sm">{enCarrito}</span>
                    </>
                  ) : null}
                  <button
                    onClick={() => agregarAlCarrito(plato)}
                    className="w-7 h-7 bg-wine text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Panel inferior: carrito + botón */}
      {carrito.length > 0 && (
        <div className="bg-white border-t p-4 space-y-3 sticky bottom-0">
          {/* Resumen items */}
          <div className="max-h-32 overflow-y-auto space-y-1">
            {carrito.map((item) => (
              <div key={item._id} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{item.cantidad}x {item.nombre}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">${(item.precio * item.cantidad).toLocaleString("es-AR")}</span>
                  <button onClick={() => actualizarCantidad(item._id, 0)} className="text-red-400 hover:text-red-600">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Notas */}
          <input
            type="text"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Notas del pedido (sin cebolla, etc.)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-wine focus:border-transparent"
          />

          {/* Total + Botón */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total</p>
              <p className="font-bold text-xl text-wine">${totalPedido.toLocaleString("es-AR")}</p>
            </div>
            <button
              onClick={handleEnviarPedido}
              disabled={enviando}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all disabled:opacity-50"
            >
              <SendHorizontal size={18} />
              {enviando ? "Enviando..." : "Enviar pedido"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
