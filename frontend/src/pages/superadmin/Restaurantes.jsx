import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/admin/DashboardLayout';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { getSuperadminRestaurantes, eliminarRestaurante } from '../../services/api';

export default function Restaurantes() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    fetchRestaurantes();
  }, []);

  const fetchRestaurantes = async () => {
    try {
      const res = await getSuperadminRestaurantes();
      setRestaurantes(res.data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id, nombre) => {
    if (!confirm(`¿Estás seguro de eliminar "${nombre}"? Se eliminarán TODOS sus datos (platos, categorías, usuarios).`)) {
      return;
    }

    try {
      await eliminarRestaurante(id);
      alert('Restaurante eliminado correctamente');
      fetchRestaurantes();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar restaurante');
    }
  };

  const restaurantesFiltrados = restaurantes.filter(rest =>
    rest.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    rest.slug.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-xl animate-pulse">Cargando restaurantes...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Restaurantes</h1>
          <p className="text-gray-600 mt-1">Gestiona todos los restaurantes del sistema</p>
        </div>
        <Link
          to="/superadmin/restaurantes/nuevo"
          className="btn-primary inline-flex items-center gap-2"
        >
          <Plus size={20} />
          Nuevo Restaurante
        </Link>
      </div>

      {/* Buscar */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar restaurante..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
        />
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Restaurante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Slug
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Platos
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Usuarios
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Plan
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
              {restaurantesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No se encontraron restaurantes
                  </td>
                </tr>
              ) : (
                restaurantesFiltrados.map((rest) => (
                  <tr key={rest._id} className="hover:bg-gray-50">
                    {/* Nombre */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {rest.logo && (
                          <img
                            src={rest.logo}
                            alt={rest.nombre}
                            className="h-10 w-10 object-contain"
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{rest.nombre}</div>
                          <div className="text-sm text-gray-500">{rest.descripcion}</div>
                        </div>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="px-6 py-4">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {rest.slug}
                      </code>
                    </td>

                    {/* Platos */}
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-medium">{rest.platoCount || 0}</span>
                    </td>

                    {/* Usuarios */}
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-medium">{rest.usuarioCount || 0}</span>
                    </td>

                    {/* Plan */}
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {rest.plan || 'básico'}
                      </span>
                    </td>

                    {/* Estado */}
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        rest.activo
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {rest.activo ? <Eye size={14} /> : <EyeOff size={14} />}
                        {rest.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>

                    {/* Acciones */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        
                        <a  href={`/${rest.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-all"
                          title="Ver menú público"
                        >
                          <Eye size={18} />
                        </a>
                        <Link
                          to={`/superadmin/restaurantes/${rest._id}/editar`}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-all"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleEliminar(rest._id, rest.nombre)}
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
    </DashboardLayout>
  );
}