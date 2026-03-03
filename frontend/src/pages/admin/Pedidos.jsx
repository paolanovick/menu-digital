import { useEffect, useState, useCallback } from "react";
import DashboardLayout from "../../components/admin/DashboardLayout";
import { getPedidos, actualizarEstadoPedido } from "../../services/api";
import toast from "react-hot-toast";
import { RefreshCw } from "lucide-react";

const ESTADOS = ["nuevo", "preparando", "listo", "entregado", "cancelado"];

const ESTADO_CONFIG = {
  nuevo: { label: "Nuevo", color: "bg-blue-100 text-blue-800", next: "preparando" },
  preparando: { label: "Preparando", color: "bg-yellow-100 text-yellow-800", next: "listo" },
  listo: { label: "Listo", color: "bg-green-100 text-green-800", next: "entregado" },
  entregado: { label: "Entregado", color: "bg-gray-100 text-gray-600", next: null },
  cancelado: { label: "Cancelado", color: "bg-red-100 text-red-800", next: null },
};

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroEstado, setFiltroEstado] = useState("todos");

  const fetchPedidos = useCallback(async () => {
    try {
      const params = {};
      if (filtroTipo !== "todos") params.tipo = filtroTipo;
      if (filtroEstado !== "todos") params.estado = filtroEstado;
      const res = await getPedidos(params);
      setPedidos(res.data.data);
    } catch {
      toast.error("Error al cargar pedidos");
    } finally {
      setLoading(false);
    }
  }, [filtroTipo, filtroEstado]);

  useEffect(() => {
    fetchPedidos();
    // Polling cada 30 segundos
    const interval = setInterval(fetchPedidos, 30000);
    return () => clearInterval(interval);
  }, [fetchPedidos]);

  const handleAvanzarEstado = async (pedido) => {
    const siguiente = ESTADO_CONFIG[pedido.estado]?.next;
    if (!siguiente) return;
    try {
      await actualizarEstadoPedido(pedido._id, siguiente);
      toast.success(`Pedido #${pedido.numeroOrden} → ${ESTADO_CONFIG[siguiente].label}`);
      fetchPedidos();
    } catch {
      toast.error("Error al actualizar estado");
    }
  };

  const handleCancelar = async (pedido) => {
    try {
      await actualizarEstadoPedido(pedido._id, "cancelado");
      toast.success(`Pedido #${pedido.numeroOrden} cancelado`);
      fetchPedidos();
    } catch {
      toast.error("Error al cancelar");
    }
  };

  const formatHora = (fecha) => {
    return new Date(fecha).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
  };

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" });
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Pedidos</h1>
          <p className="text-gray-600 mt-1 text-sm">Se actualiza automáticamente cada 30 segundos</p>
        </div>
        <button
          onClick={fetchPedidos}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium"
        >
          <RefreshCw size={16} />
          Actualizar
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Tipo</label>
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-wine focus:border-transparent"
          >
            <option value="todos">Todos</option>
            <option value="delivery">Delivery</option>
            <option value="mesa">Mesa</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Estado</label>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-wine focus:border-transparent"
          >
            <option value="todos">Todos</option>
            {ESTADOS.map((e) => (
              <option key={e} value={e}>{ESTADO_CONFIG[e].label}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="loader"><div className="cup"><div className="cup-handle"></div><div className="smoke one"></div><div className="smoke two"></div><div className="smoke three"></div></div><div className="load">Cargando...</div></div>
        </div>
      ) : pedidos.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-gray-500 text-lg">No hay pedidos todavía</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <div key={pedido._id} className="bg-white rounded-xl shadow-md p-4 lg:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{pedido.tipo === "delivery" ? "🛵" : "🪑"}</span>
                  <div>
                    <p className="font-bold text-lg">
                      Pedido #{pedido.numeroOrden}
                      {pedido.tipo === "mesa" && ` · Mesa ${pedido.mesaNumero}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatFecha(pedido.createdAt)} · {formatHora(pedido.createdAt)}
                      {pedido.mozoNombre && ` · Mozo: ${pedido.mozoNombre}`}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${ESTADO_CONFIG[pedido.estado].color}`}>
                  {ESTADO_CONFIG[pedido.estado].label}
                </span>
              </div>

              {/* Items */}
              <div className="mb-4 space-y-1">
                {pedido.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.cantidad}x {item.nombre}</span>
                    <span className="font-medium">${item.subtotal.toLocaleString("es-AR")}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-wine">${pedido.total.toLocaleString("es-AR")}</span>
                </div>
              </div>

              {/* Datos cliente (delivery) */}
              {pedido.tipo === "delivery" && pedido.datosCliente?.direccion && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm">
                  <p>📍 {pedido.datosCliente.direccion}</p>
                  {pedido.datosCliente.telefono && <p>📞 {pedido.datosCliente.telefono}</p>}
                </div>
              )}
              {pedido.notas && (
                <div className="mb-4 p-3 bg-yellow-50 rounded-lg text-sm text-gray-700">
                  📝 {pedido.notas}
                </div>
              )}

              {/* Acciones */}
              <div className="flex gap-2 flex-wrap">
                {ESTADO_CONFIG[pedido.estado].next && (
                  <button
                    onClick={() => handleAvanzarEstado(pedido)}
                    className="px-4 py-2 bg-wine text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all"
                  >
                    → {ESTADO_CONFIG[ESTADO_CONFIG[pedido.estado].next].label}
                  </button>
                )}
                {pedido.estado !== "cancelado" && pedido.estado !== "entregado" && (
                  <button
                    onClick={() => handleCancelar(pedido)}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-all"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
