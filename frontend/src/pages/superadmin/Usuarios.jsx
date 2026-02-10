import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/admin/DashboardLayout";
import { Plus, Trash2, Shield, User, Edit } from "lucide-react";
import {
  getSuperadminUsuarios,
  eliminarUsuarioSuperadmin,
} from "../../services/api";
import toast from "react-hot-toast";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await getSuperadminUsuarios();
      setUsuarios(res.data.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id, nombre) => {
    if (!confirm(`¿Estás seguro de eliminar al usuario "${nombre}"?`)) {
      return;
    }

    try {
      await eliminarUsuarioSuperadmin(id);
     toast.success("Usuario eliminado correctamente");
      fetchUsuarios();
    } catch (error) {
      console.error("Error:", error);
  toast.error("Error al eliminar usuario");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-xl animate-pulse">Cargando usuarios...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Usuarios</h1>
          <p className="text-gray-600 mt-1">
            Gestiona todos los usuarios del sistema
          </p>
        </div>
        <Link
          to="/superadmin/usuarios/nuevo"
          className="btn-primary inline-flex items-center gap-2"
        >
          <Plus size={20} />
          Nuevo Usuario
        </Link>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Restaurante
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Rol
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usuarios.map((usuario) => (
                <tr key={usuario._id} className="hover:bg-gray-50">
                  {/* Usuario */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User size={20} className="text-gray-600" />
                      </div>
                      <div className="font-medium text-gray-900">
                        {usuario.nombre}
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {usuario.email}
                  </td>

                  {/* Restaurante */}
                  <td className="px-6 py-4 text-sm">
                    {usuario.restauranteId ? (
                      <span className="text-gray-900">
                        {usuario.restauranteId.nombre}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">
                        Sin restaurante
                      </span>
                    )}
                  </td>

                  {/* Rol */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        usuario.rol === "superadmin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {usuario.rol === "superadmin" && <Shield size={14} />}
                      {usuario.rol}
                    </span>
                  </td>

                  {/* Estado */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        usuario.activo
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {usuario.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/superadmin/usuarios/${usuario._id}/editar`}
                        className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-all"
                        title="Editar"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() =>
                          handleEliminar(usuario._id, usuario.nombre)
                        }
                        disabled={usuario.rol === "superadmin"}
                        className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        title={
                          usuario.rol === "superadmin"
                            ? "No se puede eliminar superadmin"
                            : "Eliminar"
                        }
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
