import { useEffect, useState } from "react";
import DashboardLayout from "../../components/admin/DashboardLayout";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import api from "../../services/api";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    icono: "🍽️",
    visible: true,
  });

  useEffect(() => {
    fetchCategorias();
  }, []);

 const fetchCategorias = async () => {
   try {
     const [resCategorias, resPlatos] = await Promise.all([
       api.get("/api/categorias/admin/mis-categorias"),
       api.get("/api/platos/admin/mis-platos"),
     ]);

     const platos = resPlatos.data.data;
     const categoriasConConteo = resCategorias.data.data.map((categoria) => ({
       ...categoria,
       platoCount: platos.filter((p) => p.categoriaId._id === categoria._id)
         .length,
     }));

     setCategorias(categoriasConConteo);
   } catch (error) {
     console.error("Error:", error);
   } finally {
     setLoading(false);
   }
 };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingCategoria) {
        await api.put(`/api/categorias/${editingCategoria._id}`, formData);
        alert("Categoría actualizada");
      } else {
        await api.post("/api/categorias", formData);
        alert("Categoría creada");
      }

      fetchCategorias();
      closeModal();
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Error al guardar categoría");
    }
  };

  const handleEdit = (categoria) => {
    setEditingCategoria(categoria);
    setFormData({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion || "",
      icono: categoria.icono || "🍽️",
      visible: categoria.visible,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta categoría?")) return;

    try {
      await api.delete(`/api/categorias/${id}`);
      alert("Categoría eliminada");
      fetchCategorias();
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Error al eliminar categoría");
    }
  };

  const toggleVisible = async (id, visible) => {
    try {
      await api.put(`/api/categorias/${id}`, { visible: !visible });
      setCategorias(
        categorias.map((c) => (c._id === id ? { ...c, visible: !visible } : c)),
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openNewModal = () => {
    setEditingCategoria(null);
    setFormData({
      nombre: "",
      descripcion: "",
      icono: "🍽️",
      visible: true,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategoria(null);
    setFormData({
      nombre: "",
      descripcion: "",
      icono: "🍽️",
      visible: true,
    });
  };

  const iconosComunes = [
    "🍽️",
    "🍕",
    "🍔",
    "🥗",
    "🍰",
    "🍺",
    "☕",
    "🥘",
    "🍜",
    "🍱",
    "🌮",
    "🍟",
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-xl animate-pulse">Cargando categorías...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Categorías</h1>
          <p className="text-gray-600 mt-1">Organiza tu menú</p>
        </div>
        <button
          onClick={openNewModal}
          className="btn-primary inline-flex items-center gap-2"
        >
          <Plus size={20} />
          Nueva Categoría
        </button>
      </div>

      {/* Grid de categorías */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorias.map((categoria) => (
          <div
            key={categoria._id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{categoria.icono}</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {categoria.nombre}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {categoria.platoCount || 0} platos
                  </p>
                </div>
              </div>

              {/* Visible toggle */}
              <button
                onClick={() => toggleVisible(categoria._id, categoria.visible)}
                className={`p-2 rounded-lg transition-all ${
                  categoria.visible
                    ? "text-green-600 hover:bg-green-50"
                    : "text-gray-400 hover:bg-gray-50"
                }`}
                title={categoria.visible ? "Ocultar" : "Mostrar"}
              >
                {categoria.visible ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {/* Descripción */}
            {categoria.descripcion && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {categoria.descripcion}
              </p>
            )}

            {/* Acciones */}
            <div className="flex items-center gap-2 pt-4 border-t">
              <button
                onClick={() => handleEdit(categoria)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                <Edit size={16} />
                Editar
              </button>
              <button
                onClick={() => handleDelete(categoria._id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 size={16} />
                Eliminar
              </button>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {categorias.length === 0 && (
          <div className="md:col-span-3 text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-xl text-gray-500 mb-4">No hay categorías</p>
            <button
              onClick={openNewModal}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Crear primera categoría
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-6">
              {editingCategoria ? "Editar Categoría" : "Nueva Categoría"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                  placeholder="Ej: Entradas"
                  required
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) =>
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                  placeholder="Breve descripción..."
                />
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
                      className={`text-3xl p-2 rounded-lg transition-all ${
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

              {/* Visible */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.visible}
                    onChange={(e) =>
                      setFormData({ ...formData, visible: e.target.checked })
                    }
                    className="w-4 h-4 text-wine focus:ring-wine border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Visible en el menú
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
                  {editingCategoria ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
