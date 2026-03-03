import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/admin/DashboardLayout";
import { crearMozo, getMozoById, actualizarMozo } from "../../services/api";
import toast from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";

export default function MozoForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const esEdicion = Boolean(id);

  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    activo: true,
  });

  useEffect(() => {
    if (esEdicion) {
      getMozoById(id)
        .then((res) => {
          const m = res.data.data;
          setForm({ nombre: m.nombre, email: m.email, password: "", telefono: m.telefono || "", activo: m.activo });
        })
        .catch(() => toast.error("Error al cargar mozo"));
    }
  }, [id, esEdicion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = { ...form };
      if (esEdicion && !data.password) delete data.password;

      if (esEdicion) {
        await actualizarMozo(id, data);
        toast.success("Mozo actualizado");
      } else {
        await crearMozo(data);
        toast.success("Mozo creado");
      }
      navigate("/admin/mozos");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/mozos")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors font-medium"
        >
          <ArrowLeft size={18} />
          Volver a Mozos
        </button>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          {esEdicion ? "Editar Mozo" : "Nuevo Mozo"}
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input
              type="text"
              required
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
              placeholder="Juan García"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
              placeholder="juan@restaurante.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {esEdicion ? "Nueva Contraseña (dejar vacío para no cambiar)" : "Contraseña *"}
            </label>
            <input
              type="password"
              required={!esEdicion}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
              placeholder="Mínimo 6 caracteres"
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input
              type="tel"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
              placeholder="+54 9 11 1234-5678"
            />
          </div>

          {esEdicion && (
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.activo}
                onChange={(e) => setForm({ ...form, activo: e.target.checked })}
                className="w-5 h-5 text-wine"
              />
              <span className="text-sm font-medium text-gray-700">Mozo activo</span>
            </label>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/mozos")}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
