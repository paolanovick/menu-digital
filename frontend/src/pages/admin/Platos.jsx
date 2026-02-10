import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/admin/DashboardLayout";
import { Plus, Edit, Trash2, Eye, EyeOff, Star, Gift } from "lucide-react";
import api from "../../services/api";

export default function Platos() {
  const [platos, setPlatos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState("todas");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const [resPlatos, resCategorias] = await Promise.all([
        api.get("/platos/admin/mis-platos"),
        api.get("/categorias/admin/mis-categorias"),
      ]);

      setPlatos(resPlatos.data.data);
      setCategorias(resCategorias.data.data);

      // Establecer primera categoría como activa
      if (resCategorias.data.data.length > 0 && categoriaActiva === "todas") {
        setCategoriaActiva(resCategorias.data.data[0]._id);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al cargar platos");
    } finally {
      setLoading(false);
    }
  };

   const toggleDestacado = async (platoId, destacado) => {
    try {
      await api.put(`/platos/${platoId}/destacado`);
      setPlatos(
        platos.map((p) =>
          p._id === platoId ? { ...p, destacado: !destacado } : p,
        ),
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const eliminarPlato = async (platoId) => {
    if (!confirm("¿Estás seguro de eliminar este plato?")) return;

    try {
      await api.delete(`/platos/${platoId}`);
      setPlatos(platos.filter((p) => p._id !== platoId));
      alert("Plato eliminado correctamente");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al eliminar plato");
    }
  };

  // Filtrar platos por categoría activa y búsqueda
  const platosFiltrados = platos.filter((plato) => {
    const matchCategoria =
      categoriaActiva === "todas" || plato.categoriaId._id === categoriaActiva;
    const matchBusqueda = plato.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return matchCategoria && matchBusqueda;
  });

  // Contar platos por categoría
  const contarPlatosPorCategoria = (categoriaId) => {
    return platos.filter((p) => p.categoriaId._id === categoriaId).length;
  };

  const totalPlatos = platos.length;
  const sinStock = platos.filter((p) => p.stock === 0 || !p.stock).length;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-xl animate-pulse">Cargando platos...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Catálogo de Platos
          </h1>
          <div className="flex gap-4 mt-2 text-sm">
            <span className="text-gray-600">
              Total: <strong>{totalPlatos}</strong>
            </span>
            <span className="text-red-600">
              Sin stock: <strong>{sinStock}</strong>
            </span>
          </div>
        </div>
        <Link
          to="/admin/platos/nuevo"
          className="btn-primary inline-flex items-center gap-2"
        >
          <Plus size={20} />+ Nueva / Editar plato
        </Link>
      </div>

      {/* Buscar */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar plato..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
        />
      </div>

      {/* PESTAÑAS - Estilo El Danés */}
      <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setCategoriaActiva("todas")}
            className={`px-6 py-3 font-medium whitespace-nowrap transition-all border-b-2 ${
              categoriaActiva === "todas"
                ? "border-wine bg-wine text-white"
                : "border-transparent hover:bg-gray-50"
            }`}
          >
            Todas
          </button>
          {categorias.map((categoria) => (
            <button
              key={categoria._id}
              onClick={() => setCategoriaActiva(categoria._id)}
              className={`px-6 py-3 font-medium whitespace-nowrap transition-all border-b-2 ${
                categoriaActiva === categoria._id
                  ? "border-wine bg-wine text-white"
                  : "border-transparent hover:bg-gray-50"
              }`}
            >
              {categoria.icono} {categoria.nombre} (
              {contarPlatosPorCategoria(categoria._id)})
            </button>
          ))}
        </div>
      </div>

      {/* TABLA - Estilo El Danés */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-wine text-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Imagen
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Nombre
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Categorías
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase">
                  Orden
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase">
                  Incentivo
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase">
                  Precio
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase">
                  Stock
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase">
                  Destacado
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {platosFiltrados.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No se encontraron platos
                  </td>
                </tr>
              ) : (
                platosFiltrados.map((plato) => (
                  <tr key={plato._id} className="hover:bg-gray-50">
                    {/* Imagen */}
                    <td className="px-4 py-3">
                      <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100">
                        {plato.imagen ? (
                          <img
                            src={plato.imagen}
                            alt={plato.nombre}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-2xl">
                            🍽️
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Nombre */}
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        {plato.nombre}
                      </div>
                      {plato.etiquetas?.destacado && (
                        <span className="text-xs text-yellow-600">
                          ⭐ Destacado
                        </span>
                      )}
                    </td>

                    {/* Categoría */}
                    <td className="px-4 py-3">
                      <span className="text-sm">
                        {plato.categoriaId.nombre}
                      </span>
                    </td>

                    {/* Orden */}
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm">{plato.orden || 1}</span>
                    </td>

                    {/* Incentivo */}
                    <td className="px-4 py-3 text-center">
                      <button
                        className={`p-1.5 rounded transition-all ${
                          plato.etiquetas?.nuevo
                            ? "text-pink-600 hover:bg-pink-50"
                            : "text-gray-400 hover:bg-gray-50"
                        }`}
                        title="Incentivo de compra"
                      >
                        <Gift
                          size={18}
                          fill={
                            plato.etiquetas?.nuevo ? "currentColor" : "none"
                          }
                        />
                      </button>
                    </td>

                    {/* Precio */}
                    <td className="px-4 py-3 text-right">
                      <span className="font-semibold text-gray-900">
                        ${plato.precio.toLocaleString("es-AR")}
                      </span>
                    </td>

                    {/* Stock */}
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          (plato.stock || 0) > 5
                            ? "bg-green-100 text-green-800"
                            : (plato.stock || 0) > 0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {plato.stock || 0}
                      </span>
                    </td>

                    {/* Destacado */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() =>
                          toggleDestacado(plato._id, plato.destacado)
                        }
                        className={`p-1.5 rounded transition-all ${
                          plato.destacado
                            ? "text-yellow-500 hover:bg-yellow-50"
                            : "text-gray-400 hover:bg-gray-50"
                        }`}
                        title={
                          plato.destacado ? "Quitar destacado" : "Destacar"
                        }
                      >
                        <Star
                          size={20}
                          fill={plato.destacado ? "currentColor" : "none"}
                        />
                      </button>
                    </td>

                    {/* Acciones */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/platos/${plato._id}/editar`}
                          className="px-3 py-1.5 text-sm bg-wine text-white rounded hover:bg-wine-dark transition-all"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => eliminarPlato(plato._id)}
                          className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-all"
                        >
                          Eliminar
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
    </DashboardLayout>
  );
}
