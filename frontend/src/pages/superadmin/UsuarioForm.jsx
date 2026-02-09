import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/admin/DashboardLayout";
import { Save, ArrowLeft } from "lucide-react";
import {
  getSuperadminRestaurantes,
  crearUsuarioSuperadmin,
  getUsuarioById,
  actualizarUsuarioSuperadmin,
} from "../../services/api";

export default function UsuarioForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [restaurantes, setRestaurantes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    restauranteId: "",
    rol: "admin",
    activo: true,
  });

  useEffect(() => {
    fetchRestaurantes();
    if (isEditing) {
      fetchUsuario();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchUsuario = async () => {
    try {
      const res = await getUsuarioById(id);
      const usuario = res.data.data;

      setFormData({
        nombre: usuario.nombre,
        email: usuario.email,
        password: "", // No mostrar password
        restauranteId: usuario.restauranteId?._id || "",
        rol: usuario.rol,
        activo: usuario.activo,
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error al cargar usuario");
    }
  };

  const fetchRestaurantes = async () => {
    try {
      const res = await getSuperadminRestaurantes();
      setRestaurantes(res.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        nombre: formData.nombre,
        email: formData.email,
        restauranteId: formData.restauranteId || null,
        rol: formData.rol,
        activo: formData.activo,
      };

      // Solo incluir password si no está vacío
      if (formData.password) {
        data.password = formData.password;
      }

      if (isEditing) {
        await actualizarUsuarioSuperadmin(id, data);
        alert("Usuario actualizado correctamente");
      } else {
        await crearUsuarioSuperadmin(data);
        alert("Usuario creado correctamente");
      }

      navigate("/superadmin/usuarios");
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Error al guardar usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/superadmin/usuarios")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver a usuarios
        </button>

        <h1 className="text-3xl font-bold text-gray-800">
          {isEditing ? "Editar Usuario" : "Nuevo Usuario"}
        </h1>
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-8"
      >
        <div className="space-y-6">
          {/* Información del Usuario */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Información del Usuario
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña {!isEditing && "*"}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                  required={!isEditing}
                  minLength="6"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {isEditing
                    ? "Dejar vacío para mantener la contraseña actual"
                    : "Mínimo 6 caracteres"}
                </p>
              </div>
            </div>
          </div>

          {/* Asignación */}
          <div className="pt-6 border-t">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Asignación</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurante *
                </label>
                <select
                  name="restauranteId"
                  value={formData.restauranteId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                  required={formData.rol !== "superadmin"}
                >
                  <option value="">Seleccionar restaurante...</option>
                  {restaurantes.map((rest) => (
                    <option key={rest._id} value={rest._id}>
                      {rest.nombre} ({rest.slug})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rol
                </label>
                <select
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                >
                  <option value="admin">Admin</option>
                  <option value="superadmin">Superadmin</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="activo"
                    checked={formData.activo}
                    onChange={handleChange}
                    className="w-5 h-5 text-wine focus:ring-wine border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Usuario Activo
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              💡 <strong>Importante:</strong> Este usuario podrá acceder al
              panel admin del restaurante seleccionado usando estas
              credenciales.
            </p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate("/superadmin/usuarios")}
            className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={20} />
            {loading
              ? "Guardando..."
              : isEditing
                ? "Actualizar Usuario"
                : "Crear Usuario"}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}
