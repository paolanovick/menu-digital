import { useEffect, useState } from "react";
import DashboardLayout from "../../components/admin/DashboardLayout";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function Anuncios() {
  const [anuncios, setAnuncios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAnuncio, setEditingAnuncio] = useState(null);
  const [formData, setFormData] = useState({
    texto: "",
    icono: "📢",
    categoriaId: "",
    activo: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resAnuncios, resCategorias] = await Promise.all([
        api.get("/anuncios/admin/mis-anuncios"),
        api.get("/categorias/admin/mis-categorias"),
      ]);

      setAnuncios(resAnuncios.data.data);
      setCategorias(resCategorias.data.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        texto: formData.texto,
        icono: formData.icono,
        categoriaId: formData.categoriaId || null,
        activo: formData.activo,
      };

      if (editingAnuncio) {
        await api.put(`/anuncios/${editingAnuncio._id}`, data);
        toast.success("Anuncio actualizado");
      } else {
        await api.post("/anuncios", data);
        toast.success("Anuncio creado");
      }

      fetchData();
      closeModal();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Error al guardar anuncio");
    }
  };

  const handleEdit = (anuncio) => {
    setEditingAnuncio(anuncio);
    setFormData({
      texto: anuncio.texto,
      icono: anuncio.icono || "📢",
      categoriaId: anuncio.categoriaId?._id || "",
      activo: anuncio.activo,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este anuncio?")) return;

    try {
      await api.delete(`/anuncios/${id}`);
      toast.success("Anuncio eliminado");
      fetchData();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al eliminar anuncio");
    }
  };

  const toggleActivo = async (id) => {
    try {
      await api.put(`/anuncios/${id}/toggle`);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openNewModal = () => {
    setEditingAnuncio(null);
    setFormData({
      texto: "",
      icono: "📢",
      categoriaId: "",
      activo: true,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAnuncio(null);
    setFormData({
      texto: "",
      icono: "📢",
      categoriaId: "",
      activo: true,
    });
  };

  const iconosComunes = [
    "📢",
    "🎉",
    "🔥",
    "💰",
    "⭐",
    "🍕",
    "🍔",
    "🥗",
    "☕",
    "🎁",
    "💳",
    "🎊",
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-xl animate-pulse">Cargando anuncios...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Anuncios</h1>
          <p className="text-gray-600 mt-1">Gestiona promociones y mensajes</p>
        </div>
        <button
          onClick={openNewModal}
          className="btn-primary inline-flex items-center gap-2"
        >
          <Plus size={20} />
          Nuevo Anuncio
        </button>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-blue-800 text-sm">
          💡 Los anuncios aparecen como un carrusel infinito en la parte
          superior del menú. Puedes crear anuncios <strong>globales</strong>{" "}
          (aparecen en todas las páginas) o anuncios{" "}
          <strong>por categoría</strong> (solo en esa categoría específica).
        </p>
      </div>

      {/* Lista de anuncios */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Anuncio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alcance
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {anuncios.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No hay anuncios creados
                  </td>
                </tr>
              ) : (
                anuncios.map((anuncio) => (
                  <tr key={anuncio._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{anuncio.icono}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {anuncio.texto}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {anuncio.categoriaId ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {anuncio.categoriaId.nombre}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          🌐 Global
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => toggleActivo(anuncio._id)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          anuncio.activo
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {anuncio.activo ? (
                          <>
                            <Eye size={14} />
                            Activo
                          </>
                        ) : (
                          <>
                            <EyeOff size={14} />
                            Inactivo
                          </>
                        )}
                      </button>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(anuncio)}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-all"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(anuncio._id)}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-all"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold mb-6">
              {editingAnuncio ? "Editar Anuncio" : "Nuevo Anuncio"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Texto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje del Anuncio *
                </label>
                <textarea
                  value={formData.texto}
                  onChange={(e) =>
                    setFormData({ ...formData, texto: e.target.value })
                  }
                  rows="3"
                  maxLength="200"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                  placeholder="Ej: Lunes a Viernes: Desayunos con 20% OFF Banco Galicia hasta las 11am"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.texto.length}/200 caracteres
                </p>
              </div>

              {/* Icono */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icono
                </label>
                <div className="grid grid-cols-6 gap-2 mb-2">
                  {iconosComunes.map((icono) => (
                    <button
                      key={icono}
                      type="button"
                      onClick={() => setFormData({ ...formData, icono })}
                      className={`text-2xl p-2 rounded-lg transition-all ${
                        formData.icono === icono
                          ? "bg-wine text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {icono}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={formData.icono}
                  onChange={(e) =>
                    setFormData({ ...formData, icono: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                  placeholder="O escribe un emoji..."
                />
              </div>

              {/* Categoría */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alcance
                </label>
                <select
                  value={formData.categoriaId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoriaId: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                >
                  <option value="">🌐 Global (todas las páginas)</option>
                  {categorias.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.icono} {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Activo */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.activo}
                    onChange={(e) =>
                      setFormData({ ...formData, activo: e.target.checked })
                    }
                    className="w-4 h-4 text-wine focus:ring-wine border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Activo (visible en el menú)
                  </span>
                </label>
              </div>

              {/* Botones */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                >
                  Cancelar
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  {editingAnuncio ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
