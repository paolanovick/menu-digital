import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/admin/DashboardLayout";
import {
  UtensilsCrossed,
  FolderTree,
  Eye,
  TrendingUp,
  Plus,
  Upload,
  Settings,
} from "lucide-react";
import api from "../../services/api";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPlatos: 0,
    totalCategorias: 0,
    platosDestacados: 0,
    platosAgotados: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Obtener mis platos
        const resPlatos = await api.get("/platos/admin/mis-platos", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Obtener mis categorías
        const resCategorias = await api.get(
          "/categorias/admin/mis-categorias",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const platos = resPlatos.data.data;
        const categorias = resCategorias.data.data;

        setStats({
          totalPlatos: platos.length,
          totalCategorias: categorias.length,
          platosDestacados: platos.filter((p) => p.destacado).length,
          platosAgotados: platos.filter((p) => !p.disponible).length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Platos",
      value: stats.totalPlatos,
      icon: UtensilsCrossed,
      color: "bg-blue-500",
      link: "/admin/platos",
    },
    {
      title: "Categorías",
      value: stats.totalCategorias,
      icon: FolderTree,
      color: "bg-green-500",
      link: "/admin/categorias",
    },
    {
      title: "Destacados",
      value: stats.platosDestacados,
      icon: TrendingUp,
      color: "bg-yellow-500",
      link: "/admin/platos",
    },
    {
      title: "Agotados",
      value: stats.platosAgotados,
      icon: Eye,
      color: "bg-red-500",
      link: "/admin/platos",
    },
  ];

  const quickActions = [
    {
      title: "Agregar Plato",
      description: "Crear un nuevo plato",
      icon: Plus,
      color: "bg-wine",
      link: "/admin/platos/nuevo",
    },
    {
      title: "Importar Excel",
      description: "Subir menú completo",
      icon: Upload,
      color: "bg-blue-600",
      link: "/admin/importar",
    },
    {
      title: "Configuración",
      description: "Colores y logo",
      icon: Settings,
      color: "bg-gray-700",
      link: "/admin/configuracion",
    },
  ];

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
          ¡Bienvenido, {user?.nombre}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Gestiona tu menú digital desde aquí
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} text-white p-3 rounded-lg`}>
                  <Icon size={24} />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div
                  className={`${action.color} text-white p-4 rounded-lg inline-flex mb-4`}
                >
                  <Icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-wine to-wine-dark text-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-2">💡 ¿Necesitas ayuda?</h3>
        <p className="mb-4 opacity-90">
          Puedes importar todo tu menú desde un archivo Excel en segundos.
        </p>
        <Link
          to="/admin/importar"
          className="inline-block bg-white text-wine px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all"
        >
          Importar Menú →
        </Link>
      </div>
    </DashboardLayout>
  );
}
