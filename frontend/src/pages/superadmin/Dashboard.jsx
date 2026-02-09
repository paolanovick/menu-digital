import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/admin/DashboardLayout";
import { Store, Users, UtensilsCrossed, FolderTree } from "lucide-react";
import { getSuperadminStats } from "../../services/api";

export default function SuperadminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getSuperadminStats();
      setStats(res.data.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = stats
    ? [
        {
          title: "Total Restaurantes",
          value: stats.totalRestaurantes,
          icon: Store,
          color: "bg-blue-500",
          link: "/superadmin/restaurantes",
        },
        {
          title: "Total Usuarios",
          value: stats.totalUsuarios,
          icon: Users,
          color: "bg-green-500",
          link: "/superadmin/usuarios",
        },
        {
          title: "Total Platos",
          value: stats.totalPlatos,
          icon: UtensilsCrossed,
          color: "bg-purple-500",
          link: null,
        },
        {
          title: "Total Categorías",
          value: stats.totalCategorias,
          icon: FolderTree,
          color: "bg-orange-500",
          link: null,
        },
      ]
    : [];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-xl animate-pulse">Cargando estadísticas...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          🔧 Superadmin Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Bienvenido, {user?.nombre}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const CardContent = (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} text-white p-3 rounded-lg`}>
                  <Icon size={24} />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </>
          );

          return stat.link ? (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              {CardContent}
            </Link>
          ) : (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              {CardContent}
            </div>
          );
        })}
      </div>

      {/* Estado de Restaurantes */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Estado de Restaurantes
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Activos</span>
                <span className="text-2xl font-bold text-green-600">
                  {stats.restaurantesActivos}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Inactivos</span>
                <span className="text-2xl font-bold text-red-600">
                  {stats.restaurantesInactivos}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Acciones Rápidas</h2>
            <div className="space-y-2">
              <Link
                to="/superadmin/restaurantes"
                className="block bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all"
              >
                → Ver todos los restaurantes
              </Link>
              <Link
                to="/superadmin/usuarios"
                className="block bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all"
              >
                → Gestionar usuarios
              </Link>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

