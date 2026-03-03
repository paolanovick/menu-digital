import { useEffect, useState } from "react";
import DashboardLayout from "../../components/admin/DashboardLayout";
import { getMesas, crearMesa, actualizarMesa, eliminarMesa } from "../../services/api";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const ESTADO_COLOR = {
  libre: "bg-green-100 text-green-800 border-green-200",
  ocupada: "bg-red-100 text-red-800 border-red-200",
  reservada: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

const ESTADO_LABEL = { libre: "Libre", ocupada: "Ocupada", reservada: "Reservada" };

const FORM_INICIAL = { numero: "", nombre: "", capacidad: 4 };

export default function Mesas() {
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState(FORM_INICIAL);
  const [saving, setSaving] = useState(false);

  const fetchMesas = async () => {
    try {
      const res = await getMesas();
      setMesas(res.data.data);
    } catch {
      toast.error("Error al cargar mesas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMesas(); }, []);

  const abrirModal = (mesa = null) => {
    if (mesa) {
      setEditando(mesa._id);
      setForm({ numero: mesa.numero, nombre: mesa.nombre || "", capacidad: mesa.capacidad });
    } else {
      setEditando(null);
      setForm(FORM_INICIAL);
    }
    setShowModal(true);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editando) {
        await actualizarMesa(editando, form);
        toast.success("Mesa actualizada");
      } else {
        await crearMesa(form);
        toast.success("Mesa creada");
      }
      setShowModal(false);
      fetchMesas();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar esta mesa?")) return;
    try {
      await eliminarMesa(id);
      toast.success("Mesa eliminada");
      fetchMesas();
    } catch {
      toast.error("Error al eliminar");
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Mesas</h1>
          <p className="text-gray-600 mt-1 text-sm">Gestiona las mesas del local</p>
        </div>
        <button
          onClick={() => abrirModal()}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Nueva Mesa
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="loader"><div className="cup"><div className="cup-handle"></div><div className="smoke one"></div><div className="smoke two"></div><div className="smoke three"></div></div><div className="load">Cargando...</div></div>
        </div>
      ) : mesas.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-5xl mb-4">🪑</div>
          <p className="text-gray-500 text-lg mb-4">No hay mesas configuradas</p>
          <button onClick={() => abrirModal()} className="btn-primary">
            Agregar primera mesa
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mesas.map((mesa) => (
            <div
              key={mesa._id}
              className={`border-2 rounded-xl p-4 text-center relative ${ESTADO_COLOR[mesa.estado]}`}
            >
              <p className="font-bold text-2xl mb-1">#{mesa.numero}</p>
              {mesa.nombre && <p className="text-sm mb-1">{mesa.nombre}</p>}
              <p className="text-xs mb-2">{mesa.capacidad} personas</p>
              <span className="text-xs font-medium">{ESTADO_LABEL[mesa.estado]}</span>

              <div className="flex justify-center gap-2 mt-3">
                <button
                  onClick={() => abrirModal(mesa)}
                  className="p-1 hover:bg-white/50 rounded transition-all"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleEliminar(mesa._id)}
                  className="p-1 hover:bg-white/50 rounded transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editando ? "Editar Mesa" : "Nueva Mesa"}
              </h2>
              <button onClick={() => setShowModal(false)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleGuardar} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de mesa *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={form.numero}
                  onChange={(e) => setForm({ ...form, numero: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre / Sector (opcional)
                </label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Ej: Terraza, VIP, Salón"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacidad
                </label>
                <input
                  type="number"
                  min="1"
                  value={form.capacidad}
                  onChange={(e) => setForm({ ...form, capacidad: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 btn-primary disabled:opacity-50"
                >
                  {saving ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
