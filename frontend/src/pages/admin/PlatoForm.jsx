import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/admin/DashboardLayout";
import { Save, ArrowLeft } from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function PlatoForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    categoriaId: "",
    precio: "",
    imagen: "",
    ingredientes: "",
    alergenos: "",
    stock: 0,
    orden: 1,
    vegetariano: false,
    vegano: false,
    sinGluten: false,
    picante: false,
    nuevo: false,
    destacado: false,
    disponible: true,
  });

  useEffect(() => {
    fetchCategorias();
    if (isEditing) {
      fetchPlato();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchCategorias = async () => {
    try {
      const res = await api.get("/categorias/admin/mis-categorias");
      setCategorias(res.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchPlato = async () => {
    try {
      const res = await api.get(`/platos/${id}`);
      const plato = res.data.data;

      setFormData({
        nombre: plato.nombre,
        descripcion: plato.descripcion || "",
        categoriaId: plato.categoriaId._id,
        precio: plato.precio,
        imagen: plato.imagen || "",
        ingredientes: plato.ingredientes.join(", "),
        alergenos: plato.alergenos.join(", "),
        stock: plato.stock || 0,
        orden: plato.orden || 1,
        vegetariano: plato.etiquetas?.vegetariano || false,
        vegano: plato.etiquetas?.vegano || false,
        sinGluten: plato.etiquetas?.sinGluten || false,
        picante: plato.etiquetas?.picante || false,
        nuevo: plato.etiquetas?.nuevo || false,
        destacado: plato.destacado || false,
        disponible: plato.disponible,
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al cargar plato");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        categoriaId: formData.categoriaId,
        precio: parseFloat(formData.precio),
        imagen: formData.imagen,
        ingredientes: formData.ingredientes
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
        alergenos: formData.alergenos
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        stock: parseInt(formData.stock) || 0,
        orden: parseInt(formData.orden) || 1,
        etiquetas: {
          vegetariano: formData.vegetariano,
          vegano: formData.vegano,
          sinGluten: formData.sinGluten,
          picante: formData.picante,
          nuevo: formData.nuevo,
        },
        destacado: formData.destacado,
        disponible: formData.disponible,
      };

      if (isEditing) {
        await api.put(`/platos/${id}`, data);
        toast.success("Plato actualizado correctamente");
      } else {
        await api.post("/platos", data);
        toast.success("Plato creado correctamente");
      }

      navigate("/admin/platos");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Error al guardar plato");
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
      <div className="mb-8">
        <button
          onClick={() => navigate("/admin/platos")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver a platos
        </button>

        <h1 className="text-3xl font-bold text-gray-800">
          {isEditing ? "Editar Plato" : "Nuevo Plato"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-8"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
              placeholder="Ej: Malbec Clásico"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
              placeholder="Describe el producto..."
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio *
              </label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                placeholder="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Orden de Visualización
              </label>
              <input
                type="number"
                name="orden"
                value={formData.orden}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                placeholder="1"
              />
              <p className="text-xs text-gray-500 mt-1">
                (Números del 1 al 10 en visualización primero)
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen (URL)
            </label>
            <input
              type="url"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categorías *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categorias.map((cat) => (
                <label
                  key={cat._id}
                  className={`flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.categoriaId === cat._id
                      ? "border-wine bg-wine text-white"
                      : "border-gray-300 hover:border-wine"
                  }`}
                >
                  <input
                    type="radio"
                    name="categoriaId"
                    value={cat._id}
                    checked={formData.categoriaId === cat._id}
                    onChange={handleChange}
                    className="sr-only"
                    required
                  />
                  <span className="text-xl">{cat.icono}</span>
                  <span className="font-medium text-sm">{cat.nombre}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingredientes (separados por comas)
            </label>
            <input
              type="text"
              name="ingredientes"
              value={formData.ingredientes}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
              placeholder="carne, tomate, queso, oregano"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alérgenos (separados por comas)
            </label>
            <input
              type="text"
              name="alergenos"
              value={formData.alergenos}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
              placeholder="gluten, lacteos, huevo"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-wine transition-all">
              <input
                type="checkbox"
                name="destacado"
                checked={formData.destacado}
                onChange={handleChange}
                className="w-5 h-5 text-wine focus:ring-wine border-gray-300 rounded"
              />
              <div>
                <div className="font-medium text-gray-900">
                  Producto destacado ⭐
                </div>
                <div className="text-xs text-gray-500">Aparece en carousel</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-wine transition-all">
              <input
                type="checkbox"
                name="nuevo"
                checked={formData.nuevo}
                onChange={handleChange}
                className="w-5 h-5 text-wine focus:ring-wine border-gray-300 rounded"
              />
              <div>
                <div className="font-medium text-gray-900">
                  Sugerir como incentivo de compra 🎁
                </div>
                <div className="text-xs text-gray-500">Promoción especial</div>
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Etiquetas
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  name="vegetariano"
                  checked={formData.vegetariano}
                  onChange={handleChange}
                  className="w-4 h-4 text-wine focus:ring-wine border-gray-300 rounded"
                />
                <span className="text-sm">🌱 Vegetariano</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  name="vegano"
                  checked={formData.vegano}
                  onChange={handleChange}
                  className="w-4 h-4 text-wine focus:ring-wine border-gray-300 rounded"
                />
                <span className="text-sm">🌿 Vegano</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  name="sinGluten"
                  checked={formData.sinGluten}
                  onChange={handleChange}
                  className="w-4 h-4 text-wine focus:ring-wine border-gray-300 rounded"
                />
                <span className="text-sm">🌾 Sin Gluten</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  name="picante"
                  checked={formData.picante}
                  onChange={handleChange}
                  className="w-4 h-4 text-wine focus:ring-wine border-gray-300 rounded"
                />
                <span className="text-sm">🌶️ Picante</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate("/admin/platos")}
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
            {loading ? "Guardando..." : isEditing ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}
