import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/admin/DashboardLayout";
import { Save, Palette, Globe, Clock, MapPin, FileText } from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function Configuracion() {
  const { user: _user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("tema");

  const [restaurante, setRestaurante] = useState(null);
  const [formData, setFormData] = useState({
    // Información Básica
    nombre: "", // ← AGREGADO
    descripcion: "", // ← AGREGADO

    // Tema
    colorPrimario: "#a83132",
    colorSecundario: "#777f82",
    colorFondo: "#f7f5f2",
    colorTexto: "#3d4245",
    fuente: "playfair",
    logo: "",

    // Contacto
    email: "",
    telefono: "",
    whatsapp: "",

    // Dirección
    calle: "",
    ciudad: "",
    provincia: "",
    codigoPostal: "",

    // Redes sociales
    instagram: "",
    facebook: "",

    // Horarios
    lunes: { apertura: "", cierre: "" },
    martes: { apertura: "", cierre: "" },
    miercoles: { apertura: "", cierre: "" },
    jueves: { apertura: "", cierre: "" },
    viernes: { apertura: "", cierre: "" },
    sabado: { apertura: "", cierre: "" },
    domingo: { apertura: "", cierre: "" },

    // Servicios
    deliveryActivo: true,
  });

  useEffect(() => {
    fetchRestaurante();
  }, []);

  const fetchRestaurante = async () => {
    try {
      const res = await api.get("/restaurantes/admin/mi-restaurante");
      const rest = res.data.data;

      setRestaurante(rest);
      setFormData({
        // Información Básica (NUEVO)
        nombre: rest.nombre || "", // ← AGREGADO
        descripcion: rest.descripcion || "", // ← AGREGADO

        // Tema
        colorPrimario: rest.tema?.colorPrimario || "#a83132",
        colorSecundario: rest.tema?.colorSecundario || "#777f82",
        colorFondo: rest.tema?.colorFondo || "#f7f5f2",
        colorTexto: rest.tema?.colorTexto || "#3d4245",
        fuente: rest.tema?.fuente || "playfair",
        logo: rest.logo || "",

        // Contacto
        email: rest.contacto?.email || "",
        telefono: rest.contacto?.telefono || "",
        whatsapp: rest.contacto?.whatsapp || "",

        // Dirección
        calle: rest.contacto?.direccion?.calle || "",
        ciudad: rest.contacto?.direccion?.ciudad || "",
        provincia: rest.contacto?.direccion?.provincia || "",
        codigoPostal: rest.contacto?.direccion?.codigoPostal || "",

        // Redes
        instagram: rest.redesSociales?.instagram || "",
        facebook: rest.redesSociales?.facebook || "",

        // Horarios
        lunes: rest.horarios?.lunes || { apertura: "", cierre: "" },
        martes: rest.horarios?.martes || { apertura: "", cierre: "" },
        miercoles: rest.horarios?.miercoles || { apertura: "", cierre: "" },
        jueves: rest.horarios?.jueves || { apertura: "", cierre: "" },
        viernes: rest.horarios?.viernes || { apertura: "", cierre: "" },
        sabado: rest.horarios?.sabado || { apertura: "", cierre: "" },
        domingo: rest.horarios?.domingo || { apertura: "", cierre: "" },

        // Servicios
        deliveryActivo: rest.deliveryActivo ?? true,
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // NUEVA FUNCIÓN: Guardar información básica
 const handleSubmitBasico = async (e) => {
   e.preventDefault();
   setSaving(true);

   try {
     // ✅ CORRECTO: Solo envía nombre y descripcion
     await api.put(`/restaurantes/${restaurante._id}`, {
       nombre: formData.nombre,
       descripcion: formData.descripcion,
     });

     toast.success("Información básica actualizada correctamente");
     fetchRestaurante();
   } catch (error) {
     console.error("Error:", error);
     toast.error("Error al actualizar información");
   } finally {
     setSaving(false);
   }
 };
  const handleSubmitTema = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put(`/restaurantes/${restaurante._id}/tema`, {
        colorPrimario: formData.colorPrimario,
        colorSecundario: formData.colorSecundario,
        colorFondo: formData.colorFondo,
        colorTexto: formData.colorTexto,
        fuente: formData.fuente,
      });

      if (formData.logo !== restaurante.logo) {
        await api.put(`/restaurantes/${restaurante._id}`, {
          logo: formData.logo,
        });
      }

      toast.success("Tema actualizado correctamente");
      fetchRestaurante();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al actualizar tema");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitContacto = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put(`/restaurantes/${restaurante._id}/contacto`, {
        email: formData.email,
        telefono: formData.telefono,
        whatsapp: formData.whatsapp,
        direccion: {
          calle: formData.calle,
          ciudad: formData.ciudad,
          provincia: formData.provincia,
          codigoPostal: formData.codigoPostal,
          pais: "Argentina",
        },
      });

      await api.put(`/restaurantes/${restaurante._id}`, {
        redesSociales: {
          instagram: formData.instagram,
          facebook: formData.facebook,
        },
      });

      toast.success("Contacto actualizado correctamente");
      fetchRestaurante();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al actualizar contacto");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitHorarios = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put(`/restaurantes/${restaurante._id}/horarios`, {
        lunes: formData.lunes,
        martes: formData.martes,
        miercoles: formData.miercoles,
        jueves: formData.jueves,
        viernes: formData.viernes,
        sabado: formData.sabado,
        domingo: formData.domingo,
      });

      toast.success("Horarios actualizados correctamente");
      fetchRestaurante();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al actualizar horarios");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitServicios = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put(`/restaurantes/${restaurante._id}/delivery-config`, {
        deliveryActivo: formData.deliveryActivo,
      });

      toast.success("Configuración de servicios actualizada");
      fetchRestaurante();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al actualizar servicios");
    } finally {
      setSaving(false);
    }
  };

  const handleHorarioChange = (dia, campo, valor) => {
    setFormData({
      ...formData,
      [dia]: {
        ...formData[dia],
        [campo]: valor,
      },
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-xl animate-pulse">Cargando configuración...</div>
        </div>
      </DashboardLayout>
    );
  }

  // AGREGAR PESTAÑA "BÁSICO"
  const tabs = [
    { id: "basico", name: "Información Básica", icon: FileText }, // ← NUEVA PESTAÑA
    { id: "tema", name: "Tema y Logo", icon: Palette },
    { id: "contacto", name: "Contacto", icon: Globe },
    { id: "horarios", name: "Horarios", icon: Clock },
    { id: "servicios", name: "Servicios", icon: MapPin },
  ];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Configuración</h1>
        <p className="text-gray-600 mt-1">Personaliza tu restaurante</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md mb-6">
        <div className="flex border-b overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-b-2 border-wine text-wine"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Icon size={20} />
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* NUEVA PESTAÑA: Información Básica */}
      {activeTab === "basico" && (
        <form
          onSubmit={handleSubmitBasico}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            📝 Información Básica del Restaurante
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Restaurante *
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                placeholder="Ej: Mediodía"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent h-32"
                placeholder="Ej: El Restaurante que te da de comer al mediodía. Especialistas en comida casera y platos tradicionales."
                rows="4"
              />
              <p className="text-xs text-gray-500 mt-2">
                Esta descripción aparecerá en tu menú público, debajo del logo.
              </p>
            </div>

            {/* Vista previa de cómo se verá en la Home */}
            <div className="mt-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                📱 Vista previa en la Home
              </h3>
              <div className="flex flex-col items-center text-center space-y-4">
                {formData.logo && (
                  <img
                    src={formData.logo}
                    alt="Logo preview"
                    className="h-24 w-auto object-contain"
                  />
                )}
                <h4 className="text-2xl font-bold text-gray-800">
                  {formData.nombre || "Nombre del Restaurante"}
                </h4>
                {formData.descripcion && (
                  <p className="text-gray-600 max-w-md">
                    {formData.descripcion}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8 pt-6 border-t">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={20} />
              {saving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      )}

      {/* Las otras pestañas (tema, contacto, horarios, servicios) permanecen IGUAL */}
      {/* Tab: Tema y Logo */}
      {activeTab === "tema" && (
        <form
          onSubmit={handleSubmitTema}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            🎨 Personalización Visual
          </h2>

          {/* ... (código existente de la pestaña Tema) ... */}
        </form>
      )}

      {/* Tab: Contacto */}
      {activeTab === "contacto" && (
        <form
          onSubmit={handleSubmitContacto}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            📞 Información de Contacto
          </h2>

          {/* ... (código existente de la pestaña Contacto) ... */}
        </form>
      )}

      {/* Tab: Horarios */}
      {/* Tab: Horarios */}
      {activeTab === "horarios" && (
        <form
          onSubmit={handleSubmitHorarios}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            ⏰ Horarios de Atención
          </h2>

          <div className="space-y-4">
            {[
              "lunes",
              "martes",
              "miercoles",
              "jueves",
              "viernes",
              "sabado",
              "domingo",
            ].map((dia) => (
              <div
                key={dia}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
              >
                <div className="font-medium text-gray-700 capitalize">
                  {dia}
                </div>
                <div>
                  <input
                    type="time"
                    value={formData[dia].apertura}
                    onChange={(e) =>
                      handleHorarioChange(dia, "apertura", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="time"
                    value={formData[dia].cierre}
                    onChange={(e) =>
                      handleHorarioChange(dia, "cierre", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-8 pt-6 border-t">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={20} />
              {saving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      )}

      {/* Tab: Servicios */}
      {activeTab === "servicios" && (
        <form
          onSubmit={handleSubmitServicios}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            🚚 Opciones de Servicio
          </h2>

          {/* ... (código existente de la pestaña Servicios) ... */}
        </form>
      )}
    </DashboardLayout>
  );
}
