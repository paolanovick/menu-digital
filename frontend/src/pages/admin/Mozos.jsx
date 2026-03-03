import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/admin/DashboardLayout";
import { getMisMozos, eliminarMozo } from "../../services/api";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function Mozos() {
  const navigate = useNavigate();
  const [mozos, setMozos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMozos = async () => {
    try {
      const res = await getMisMozos();
      setMozos(res.data.data);
    } catch {
      toast.error("Error al cargar mozos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMozos(); }, []);

  const handleEliminar = async (id, nombre) => {
    if (!window.confirm(`¿Eliminar a ${nombre}?`)) return;
    try {
      await eliminarMozo(id);
      toast.success("Mozo eliminado");
      fetchMozos();
    } catch {
      toast.error("Error al eliminar");
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Mozos</h1>
          <p className="text-gray-600 mt-1 text-sm">Gestiona el equipo de salón</p>
        </div>
        <button
          onClick={() => navigate("/admin/mozos/nuevo")}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Nuevo Mozo
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="loader"><div className="cup"><div className="cup-handle"></div><div className="smoke one"></div><div className="smoke two"></div><div className="smoke three"></div></div><div className="load">Cargando...</div></div>
        </div>
      ) : mozos.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-5xl mb-4">👨‍🍳</div>
          <p className="text-gray-500 text-lg mb-4">No hay mozos registrados</p>
          <button onClick={() => navigate("/admin/mozos/nuevo")} className="btn-primary">
            Agregar primer mozo
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Nombre</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Email</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Teléfono</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Estado</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mozos.map((mozo) => (
                <tr key={mozo._id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 font-medium text-gray-900">{mozo.nombre}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{mozo.email}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{mozo.telefono || "—"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${mozo.activo ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"}`}>
                      {mozo.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => navigate(`/admin/mozos/${mozo._id}/editar`)}
                        className="p-2 text-gray-500 hover:text-wine hover:bg-gray-100 rounded-lg transition-all"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleEliminar(mozo._id, mozo.nombre)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}
