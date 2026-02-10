import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/admin/DashboardLayout";
import { Save, ArrowLeft } from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function RestauranteForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    logo: "",
    email: "",
    telefono: "",
    whatsapp: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    activo: true,
    plan: "basico",
  });

  useEffect(() => {
    if (isEditing) {
      fetchRestaurante();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchRestaurante = async () => {
    try {
     const res = await api.get(`/superadmin/restaurantes/${id}`);
      const rest = res.data.data;

      setFormData({
        nombre: rest.nombre,
        descripcion: rest.descripcion || "",
        logo: rest.logo || "",
        email: rest.contacto?.email || "",
        telefono: rest.contacto?.telefono || "",
        whatsapp: rest.contacto?.whatsapp || "",
        direccion: rest.contacto?.direccion?.calle || "",
        ciudad: rest.contacto?.direccion?.ciudad || "",
        provincia: rest.contacto?.direccion?.provincia || "",
        activo: rest.activo,
        plan: rest.plan || "basico",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al cargar restaurante");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        logo: formData.logo,
        contacto: {
          email: formData.email,
          telefono: formData.telefono,
          whatsapp: formData.whatsapp,
          direccion: {
            calle: formData.direccion,
            ciudad: formData.ciudad,
            provincia: formData.provincia,
            pais: "Argentina",
          },
        },
        activo: formData.activo,
        plan: formData.plan,
      };

      if (isEditing) {
        await api.put(`/superadmin/restaurantes/${id}`, data);
        // Por:
        toast.success("Restaurante actualizado correctamente");
      } else {
        await api.post("/superadmin/restaurantes", data);
        toast.success("Restaurante creado correctamente");
      }

      navigate("/superadmin/restaurantes");
    } catch (error) {
      console.error("Error:", error);
     toast.error(
       error.response?.data?.message || "Error al guardar restaurante",
     );
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
          onClick={() => navigate("/superadmin/restaurantes")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver a restaurantes
        </button>

        <h1 className="text-3xl font-bold text-gray-800">
          {isEditing ? "Editar Restaurante" : "Nuevo Restaurante"}
        </h1>
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-8"
      >
        <div className="space-y-6">
          {/* Información Básica */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Información Básica
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Restaurante *
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

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo (URL)
                </label>
                <input
                  type="url"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div className="pt-6 border-t">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Contacto</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                  placeholder="5491123456789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ciudad
                </label>
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Provincia
                </label>
                <input
                  type="text"
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Configuración */}
          <div className="pt-6 border-t">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Configuración
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan
                </label>
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                >
                  <option value="basico">Básico</option>
                  <option value="premium">Premium</option>
                  <option value="enterprise">Enterprise</option>
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
                    Restaurante Activo
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate("/superadmin/restaurantes")}
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
                ? "Actualizar"
                : "Crear Restaurante"}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}
