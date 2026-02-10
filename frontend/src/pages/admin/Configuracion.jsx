import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/admin/DashboardLayout";
import { Save, Palette, Globe, Clock, MapPin } from "lucide-react";
import api from "../../services/api";

export default function Configuracion() {
 const { user: _user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("tema");

  const [restaurante, setRestaurante] = useState(null);
  const [formData, setFormData] = useState({
    // Tema
    colorPrimario: "#a83132",
    colorSecundario: "#777f82",
    colorFondo: "#f7f5f2",
    colorTexto: "#3d4245",
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
        // Tema
        colorPrimario: rest.tema?.colorPrimario || "#a83132",
        colorSecundario: rest.tema?.colorSecundario || "#777f82",
        colorFondo: rest.tema?.colorFondo || "#f7f5f2",
        colorTexto: rest.tema?.colorTexto || "#3d4245",
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
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
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
      });

      // Actualizar logo si cambió
      if (formData.logo !== restaurante.logo) {
        await api.put(`/restaurantes/${restaurante._id}`, {
          logo: formData.logo,
        });
      }

      alert("Tema actualizado correctamente");
      fetchRestaurante();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar tema");
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

      // Actualizar redes sociales
      await api.put(`/restaurantes/${restaurante._id}`, {
        redesSociales: {
          instagram: formData.instagram,
          facebook: formData.facebook,
        },
      });

      alert("Contacto actualizado correctamente");
      fetchRestaurante();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar contacto");
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

      alert("Horarios actualizados correctamente");
      fetchRestaurante();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar horarios");
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

  const tabs = [
    { id: "tema", name: "Tema y Logo", icon: Palette },
    { id: "contacto", name: "Contacto", icon: Globe },
    { id: "horarios", name: "Horarios", icon: Clock },
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
        <div className="flex border-b">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
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

      {/* Tab: Tema y Logo */}
      {activeTab === "tema" && (
        <form
          onSubmit={handleSubmitTema}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            🎨 Personalización Visual
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL del Logo
              </label>
              <input
                type="url"
                value={formData.logo}
                onChange={(e) =>
                  setFormData({ ...formData, logo: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                placeholder="https://..."
              />
              {formData.logo && (
                <div className="mt-3">
                  <img
                    src={formData.logo}
                    alt="Logo preview"
                    className="h-16 object-contain"
                  />
                </div>
              )}
            </div>

            {/* Color Primario */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Primario (Botones, Precios)
              </label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={formData.colorPrimario}
                  onChange={(e) =>
                    setFormData({ ...formData, colorPrimario: e.target.value })
                  }
                  className="h-12 w-16 rounded-lg border-2 border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.colorPrimario}
                  onChange={(e) =>
                    setFormData({ ...formData, colorPrimario: e.target.value })
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent font-mono"
                />
              </div>
            </div>

            {/* Color Secundario */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Secundario (Textos, Bordes)
              </label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={formData.colorSecundario}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      colorSecundario: e.target.value,
                    })
                  }
                  className="h-12 w-16 rounded-lg border-2 border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.colorSecundario}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      colorSecundario: e.target.value,
                    })
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent font-mono"
                />
              </div>
            </div>

            {/* Color Fondo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color de Fondo
              </label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={formData.colorFondo}
                  onChange={(e) =>
                    setFormData({ ...formData, colorFondo: e.target.value })
                  }
                  className="h-12 w-16 rounded-lg border-2 border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.colorFondo}
                  onChange={(e) =>
                    setFormData({ ...formData, colorFondo: e.target.value })
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent font-mono"
                />
              </div>
            </div>

            {/* Color Texto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color de Texto Principal
              </label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={formData.colorTexto}
                  onChange={(e) =>
                    setFormData({ ...formData, colorTexto: e.target.value })
                  }
                  className="h-12 w-16 rounded-lg border-2 border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.colorTexto}
                  onChange={(e) =>
                    setFormData({ ...formData, colorTexto: e.target.value })
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent font-mono"
                />
              </div>
            </div>
          </div>

          {/* Vista previa */}
          <div
            className="mt-8 p-6 rounded-lg"
            style={{ backgroundColor: formData.colorFondo }}
          >
            <h3
              className="text-lg font-bold mb-4"
              style={{ color: formData.colorTexto }}
            >
              Vista Previa
            </h3>
            <div className="flex gap-4 flex-wrap">
              <button
                type="button"
                className="px-6 py-3 rounded-full font-medium text-white"
                style={{ backgroundColor: formData.colorPrimario }}
              >
                Botón Primario
              </button>
              <div
                className="px-6 py-3 rounded-lg border-2"
                style={{
                  borderColor: formData.colorSecundario,
                  color: formData.colorTexto,
                }}
              >
                Texto con borde
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: formData.colorPrimario }}
              >
                $1,500
              </div>
            </div>
          </div>

          {/* Botón guardar */}
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

      {/* Tab: Contacto */}
      {activeTab === "contacto" && (
        <form
          onSubmit={handleSubmitContacto}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            📞 Información de Contacto
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) =>
                  setFormData({ ...formData, telefono: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp (con código de país)
              </label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) =>
                  setFormData({ ...formData, whatsapp: e.target.value })
                }
                placeholder="5491123456789"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección
              </label>
              <input
                type="text"
                value={formData.calle}
                onChange={(e) =>
                  setFormData({ ...formData, calle: e.target.value })
                }
                placeholder="Calle y número"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
              />
            </div>

            <div>
              <input
                type="text"
                value={formData.ciudad}
                onChange={(e) =>
                  setFormData({ ...formData, ciudad: e.target.value })
                }
                placeholder="Ciudad"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
              />
            </div>

            <div>
              <input
                type="text"
                value={formData.provincia}
                onChange={(e) =>
                  setFormData({ ...formData, provincia: e.target.value })
                }
                placeholder="Provincia"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <h3 className="text-lg font-bold text-gray-800 mb-4 mt-4">
                📱 Redes Sociales
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram (sin @)
              </label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) =>
                  setFormData({ ...formData, instagram: e.target.value })
                }
                placeholder="mirestaurante"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook
              </label>
              <input
                type="text"
                value={formData.facebook}
                onChange={(e) =>
                  setFormData({ ...formData, facebook: e.target.value })
                }
                placeholder="mirestaurante"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
              />
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
    </DashboardLayout>
  );
}
