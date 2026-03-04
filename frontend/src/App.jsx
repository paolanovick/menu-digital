import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartProvider";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import Envios from "./pages/Envios";
import Checkout from "./pages/Checkout";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Platos from "./pages/admin/Platos";
import PlatoForm from "./pages/admin/PlatoForm";
import Categorias from "./pages/admin/Categorias";
import Importar from "./pages/admin/Importar";
import Anuncios from "./pages/admin/Anuncios";
import Configuracion from "./pages/admin/Configuracion";
import Pedidos from "./pages/admin/Pedidos";
import Mesas from "./pages/admin/Mesas";
import Mozos from "./pages/admin/Mozos";
import MozoForm from "./pages/admin/MozoForm";
import MozoLogin from "./pages/mozo/Login";
import MozoMesas from "./pages/mozo/Mesas";
import MozoPedido from "./pages/mozo/Pedido";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import SuperadminDashboard from "./pages/superadmin/Dashboard";
import SuperadminRestaurantes from "./pages/superadmin/Restaurantes";
import SuperadminUsuarios from "./pages/superadmin/Usuarios";
import RestauranteForm from "./pages/superadmin/RestauranteForm";
import UsuarioForm from "./pages/superadmin/UsuarioForm";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#333",
                color: "#fff",
                borderRadius: "10px",
                padding: "12px 20px",
              },
              success: {
                iconTheme: {
                  primary: "#10B981",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#EF4444",
                  secondary: "#fff",
                },
              },
            }}
          />
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Welcome />} />
            <Route path="/:slug" element={<Home />} />
            <Route
              path="/:slug/categoria/:categoriaSlug"
              element={<CategoryPage />}
            />
            <Route path="/:slug/delivery" element={<Envios />} />
            <Route path="/:slug/checkout" element={<Checkout />} />

            {/* Admin Login */}
            <Route path="/admin/login" element={<Login />} />

            {/* Admin Dashboard */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Platos */}
            <Route
              path="/admin/platos"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Platos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/platos/nuevo"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <PlatoForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/platos/:id/editar"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <PlatoForm />
                </ProtectedRoute>
              }
            />

            {/* Admin Categorías */}
            <Route
              path="/admin/categorias"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Categorias />
                </ProtectedRoute>
              }
            />

            {/* Admin Importar */}
            <Route
              path="/admin/importar"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Importar />
                </ProtectedRoute>
              }
            />
            {/* Admin Anuncios */}
            <Route
              path="/admin/anuncios"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Anuncios />
                </ProtectedRoute>
              }
            />
            {/* Admin Configuración */}
            <Route
              path="/admin/configuracion"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Configuracion />
                </ProtectedRoute>
              }
            />
            {/* Admin Pedidos */}
            <Route
              path="/admin/pedidos"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Pedidos />
                </ProtectedRoute>
              }
            />
            {/* Admin Mesas */}
            <Route
              path="/admin/mesas"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Mesas />
                </ProtectedRoute>
              }
            />
            {/* Admin Mozos */}
            <Route
              path="/admin/mozos"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Mozos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/mozos/nuevo"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <MozoForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/mozos/:id/editar"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <MozoForm />
                </ProtectedRoute>
              }
            />
            {/* Interface Mozos */}
            <Route path="/mozo/:slug" element={<MozoLogin />} />
            <Route path="/mozo/:slug/mesas" element={<MozoMesas />} />
            <Route path="/mozo/:slug/mesa/:mesaId" element={<MozoPedido />} />
            {/* Superadmin Dashboard */}
            <Route
              path="/superadmin"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <SuperadminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/restaurantes"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <SuperadminRestaurantes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/usuarios"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <SuperadminUsuarios />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/restaurantes/nuevo"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <RestauranteForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/restaurantes/:id/editar"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <RestauranteForm />
                </ProtectedRoute>
              }
            />
            {/* Superadmin Usuarios */}
            <Route
              path="/superadmin/usuarios/nuevo"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <UsuarioForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/usuarios/:id/editar"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <UsuarioForm />
                </ProtectedRoute>
              }
            />

            {/* Alias legacy para evitar "No routes matched" */}
            <Route path="/:slug/admin" element={<Navigate to="/admin/login" replace />} />
            <Route path="/:slug/admin/login" element={<Navigate to="/admin/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
