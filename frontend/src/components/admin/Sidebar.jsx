import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  UtensilsCrossed,
  FolderTree,
  Upload,
  Settings,
  LogOut,
  Megaphone,
  Store,
  Users,
  X,
} from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const adminNavItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Platos", path: "/admin/platos", icon: UtensilsCrossed },
    { name: "Categorías", path: "/admin/categorias", icon: FolderTree },
    { name: "Anuncios", path: "/admin/anuncios", icon: Megaphone },
    { name: "Importar", path: "/admin/importar", icon: Upload },
    { name: "Configuración", path: "/admin/configuracion", icon: Settings },
  ];

  const superadminNavItems = [
    { name: "Dashboard", path: "/superadmin", icon: LayoutDashboard },
    { name: "Restaurantes", path: "/superadmin/restaurantes", icon: Store },
    { name: "Usuarios", path: "/superadmin/usuarios", icon: Users },
  ];

  const navItems =
    user?.rol === "superadmin" ? superadminNavItems : adminNavItems;

  const handleNavClick = () => {
    // Cerrar sidebar en móvil al hacer click en un link
    if (window.innerWidth < 1024) {
      onClose?.();
    }
  };

  return (
    <>
      {/* Overlay en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-gray-800 min-h-screen flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Logo */}
        <div className="p-4 lg:p-6 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl lg:text-3xl">🍽️</div>
            <div>
              <h1 className="text-white text-lg lg:text-xl font-bold">
                Menú Digital
              </h1>
              <p className="text-gray-400 text-xs">
                {user?.rol === "superadmin"
                  ? "Panel Superadmin"
                  : "Panel Admin"}
              </p>
            </div>
          </div>
          {/* Botón cerrar en móvil */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-700">
          <div className="text-white text-sm font-medium truncate">
            {user?.nombre}
          </div>
          <div className="text-gray-400 text-xs truncate">{user?.email}</div>
          {user?.rol === "superadmin" && (
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-600 text-white">
                🔧 SUPERADMIN
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-wine text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full text-gray-300 hover:bg-gray-700 rounded-lg transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </>
  );
}
