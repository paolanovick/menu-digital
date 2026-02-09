import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  FolderTree, 
  Upload, 
  Settings, 
  LogOut,
  Megaphone,
  Store,
  Users
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  console.log('🔧 Sidebar - Rol del usuario:', user?.rol); // DEBUG

  // Navegación para ADMIN normal
  const adminNavItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Platos', path: '/admin/platos', icon: UtensilsCrossed },
    { name: 'Categorías', path: '/admin/categorias', icon: FolderTree },
    { name: 'Anuncios', path: '/admin/anuncios', icon: Megaphone },
    { name: 'Importar', path: '/admin/importar', icon: Upload },
    { name: 'Configuración', path: '/admin/configuracion', icon: Settings },
  ];

  // Navegación para SUPERADMIN
  const superadminNavItems = [
    { name: 'Dashboard', path: '/superadmin', icon: LayoutDashboard },
    { name: 'Restaurantes', path: '/superadmin/restaurantes', icon: Store },
    { name: 'Usuarios', path: '/superadmin/usuarios', icon: Users },
  ];

  // Seleccionar navegación según rol
  const navItems = user?.rol === 'superadmin' ? superadminNavItems : adminNavItems;

  console.log('🔧 Sidebar - Items mostrados:', navItems.map(i => i.name)); // DEBUG

  return (
    <div className="w-64 bg-gray-800 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🍽️</div>
          <div>
            <h1 className="text-white text-xl font-bold">Menú Digital</h1>
            <p className="text-gray-400 text-xs">
              {user?.rol === 'superadmin' ? 'Panel Superadmin' : 'Panel Admin'}
            </p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-700">
        <div className="text-white text-sm font-medium">{user?.nombre}</div>
        <div className="text-gray-400 text-xs">{user?.email}</div>
        {user?.rol === 'superadmin' && (
          <div className="mt-2">
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-600 text-white">
              🔧 SUPERADMIN
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-wine text-white'
                    : 'text-gray-300 hover:bg-gray-700'
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
  );
}
