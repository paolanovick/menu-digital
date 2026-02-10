import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartProvider";
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
            <Route
              path="/"
              element={<Navigate to="/restaurante-de-paola" replace />}
            />
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
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Platos */}
            <Route
              path="/admin/platos"
              element={
                <ProtectedRoute>
                  <Platos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/platos/nuevo"
              element={
                <ProtectedRoute>
                  <PlatoForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/platos/:id/editar"
              element={
                <ProtectedRoute>
                  <PlatoForm />
                </ProtectedRoute>
              }
            />

            {/* Admin Categorías */}
            <Route
              path="/admin/categorias"
              element={
                <ProtectedRoute>
                  <Categorias />
                </ProtectedRoute>
              }
            />

            {/* Admin Importar */}
            <Route
              path="/admin/importar"
              element={
                <ProtectedRoute>
                  <Importar />
                </ProtectedRoute>
              }
            />
            {/* Admin Anuncios */}
            <Route
              path="/admin/anuncios"
              element={
                <ProtectedRoute>
                  <Anuncios />
                </ProtectedRoute>
              }
            />
            {/* Admin Configuración */}
            <Route
              path="/admin/configuracion"
              element={
                <ProtectedRoute>
                  <Configuracion />
                </ProtectedRoute>
              }
            />
            {/* Superadmin Dashboard */}
            <Route
              path="/superadmin"
              element={
                <ProtectedRoute>
                  <SuperadminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/restaurantes"
              element={
                <ProtectedRoute>
                  <SuperadminRestaurantes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/usuarios"
              element={
                <ProtectedRoute>
                  <SuperadminUsuarios />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/restaurantes/nuevo"
              element={
                <ProtectedRoute>
                  <RestauranteForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/restaurantes/:id/editar"
              element={
                <ProtectedRoute>
                  <RestauranteForm />
                </ProtectedRoute>
              }
            />
            {/* Superadmin Usuarios */}
            <Route
              path="/superadmin/usuarios/nuevo"
              element={
                <ProtectedRoute>
                  <UsuarioForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/usuarios/:id/editar"
              element={
                <ProtectedRoute>
                  <UsuarioForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
