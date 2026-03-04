import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/admin/DashboardLayout";
import { Plus, Trash2, Shield, User, Edit, ChefHat, Store } from "lucide-react";
import { getSuperadminUsuarios, eliminarUsuarioSuperadmin } from "../../services/api";
import toast from "react-hot-toast";

const ROL_BADGE = {
  superadmin: "bg-purple-100 text-purple-800",
  admin: "bg-blue-100 text-blue-800",
  mozo: "bg-amber-100 text-amber-800",
};

const ROL_LABEL = { superadmin: "Superadmin", admin: "Admin", mozo: "Mozo" };

function UsuarioFila({ usuario, onEliminar }) {
  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 group">
      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
        {usuario.rol === "mozo" ? (
          <ChefHat size={15} className="text-amber-600" />
        ) : usuario.rol === "superadmin" ? (
          <Shield size={15} className="text-purple-600" />
        ) : (
          <User size={15} className="text-blue-600" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{usuario.nombre}</p>
        <p className="text-xs text-gray-500 truncate">{usuario.email}</p>
      </div>
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium hidden sm:inline-flex ${ROL_BADGE[usuario.rol]}`}>
        {ROL_LABEL[usuario.rol]}
      </span>
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${usuario.activo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
        {usuario.activo ? "Activo" : "Inactivo"}
      </span>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link
          to={`/superadmin/usuarios/${usuario._id}/editar`}
          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          title="Editar"
        >
          <Edit size={15} />
        </Link>
        <button
          onClick={() => onEliminar(usuario._id, usuario.nombre)}
          disabled={usuario.rol === "superadmin"}
          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          title={usuario.rol === "superadmin" ? "No se puede eliminar superadmin" : "Eliminar"}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => { fetchUsuarios(); }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await getSuperadminUsuarios();
      setUsuarios(res.data.data);
    } catch {
      toast.error("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id, nombre) => {
    if (!confirm(`¿Eliminar al usuario "${nombre}"?`)) return;
    try {
      await eliminarUsuarioSuperadmin(id);
      toast.success("Usuario eliminado");
      fetchUsuarios();
    } catch {
      toast.error("Error al eliminar usuario");
    }
  };

  // Agrupar usuarios
  const superadmins = usuarios.filter((u) => u.rol === "superadmin");

  // Construir mapa de restaurantes con sus usuarios
  const mapaRestaurantes = {};
  usuarios
    .filter((u) => u.rol !== "superadmin" && u.restauranteId)
    .forEach((u) => {
      const restId = u.restauranteId._id;
      if (!mapaRestaurantes[restId]) {
        mapaRestaurantes[restId] = {
          restaurante: u.restauranteId,
          admins: [],
          mozos: [],
        };
      }
      if (u.rol === "admin") mapaRestaurantes[restId].admins.push(u);
      else if (u.rol === "mozo") mapaRestaurantes[restId].mozos.push(u);
    });

  const grupos = Object.values(mapaRestaurantes).sort((a, b) =>
    a.restaurante.nombre.localeCompare(b.restaurante.nombre)
  );

  // Filtro de búsqueda
  const filtrar = (lista) =>
    busqueda
      ? lista.filter(
          (u) =>
            u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            u.email.toLowerCase().includes(busqueda.toLowerCase())
        )
      : lista;

  const gruposFiltrados = busqueda
    ? grupos
        .map((g) => ({
          ...g,
          admins: filtrar(g.admins),
          mozos: filtrar(g.mozos),
        }))
        .filter((g) => g.admins.length > 0 || g.mozos.length > 0)
    : grupos;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="loader"><div className="cup"><div className="cup-handle"></div><div className="smoke one"></div><div className="smoke two"></div><div className="smoke three"></div></div><div className="load">Cargando...</div></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Usuarios</h1>
          <p className="text-gray-600 mt-1 text-sm">
            {usuarios.length} usuarios en total · {grupos.length} restaurantes
          </p>
        </div>
        <Link
          to="/superadmin/usuarios/nuevo"
          className="btn-primary inline-flex items-center gap-2"
        >
          <Plus size={18} />
          Nuevo Usuario
        </Link>
      </div>

      {/* Buscador */}
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar por nombre o email..."
        className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-6 focus:ring-2 focus:ring-wine focus:border-transparent bg-white shadow-sm"
      />

      <div className="space-y-5">
        {/* Superadmins */}
        {filtrar(superadmins).length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-purple-50 border-b border-purple-100">
              <Shield size={16} className="text-purple-600" />
              <span className="font-semibold text-purple-800 text-sm">Superadmins del sistema</span>
              <span className="ml-auto text-xs text-purple-500">{filtrar(superadmins).length}</span>
            </div>
            <div className="p-2">
              {filtrar(superadmins).map((u) => (
                <UsuarioFila key={u._id} usuario={u} onEliminar={handleEliminar} />
              ))}
            </div>
          </div>
        )}

        {/* Restaurantes */}
        {gruposFiltrados.map(({ restaurante, admins, mozos }) => (
          <div key={restaurante._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header restaurante */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b">
              <Store size={16} className="text-gray-500" />
              <div className="flex-1">
                <span className="font-semibold text-gray-800">{restaurante.nombre}</span>
                <code className="ml-2 text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">
                  {restaurante.slug}
                </code>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>{admins.length} admin{admins.length !== 1 ? "s" : ""}</span>
                <span>·</span>
                <span>{mozos.length} mozo{mozos.length !== 1 ? "s" : ""}</span>
              </div>
            </div>

            <div className="p-2">
              {/* Admins */}
              {admins.length > 0 && (
                <>
                  {admins.map((u) => (
                    <UsuarioFila key={u._id} usuario={u} onEliminar={handleEliminar} />
                  ))}
                </>
              )}

              {/* Separador si hay ambos */}
              {admins.length > 0 && mozos.length > 0 && (
                <div className="flex items-center gap-2 px-3 py-1 my-1">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <ChefHat size={11} /> Mozos
                  </span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
              )}

              {/* Mozos */}
              {mozos.length > 0 ? (
                mozos.map((u) => (
                  <UsuarioFila key={u._id} usuario={u} onEliminar={handleEliminar} />
                ))
              ) : (
                <p className="text-xs text-gray-400 px-3 py-2 italic">Sin mozos registrados</p>
              )}
            </div>
          </div>
        ))}

        {gruposFiltrados.length === 0 && filtrar(superadmins).length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <User size={40} className="mx-auto mb-3 opacity-30" />
            <p>No se encontraron usuarios</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
