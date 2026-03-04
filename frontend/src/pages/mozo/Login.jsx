import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { getRestauranteBySlug } from "../../services/api";
import toast from "react-hot-toast";

export default function MozoLogin() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [sistemaActivo, setSistemaActivo] = useState(null); // null = cargando

  useEffect(() => {
    getRestauranteBySlug(slug)
      .then((res) => {
        setSistemaActivo(res.data.data.sistemaMozosActivo === true);
      })
      .catch(() => setSistemaActivo(false));
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      const { token, usuario } = res.data.data;

      if (usuario.rol !== "mozo") {
        toast.error("Esta sección es solo para mozos");
        return;
      }

      // Normalizar id → _id para uso interno
      const mozoData = { ...usuario, _id: usuario.id || usuario._id };
      localStorage.setItem("token", token);
      localStorage.setItem("mozoData", JSON.stringify(mozoData));
      navigate(`/mozo/${slug}/mesas`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url(/backgroundMantel.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "300px 300px",
      }}
    >
      <div className="absolute inset-0 bg-cream opacity-90 -z-10"></div>

      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8">
        {sistemaActivo === null ? (
          <div className="flex justify-center py-8">
            <div className="loader"><div className="cup"><div className="cup-handle"></div><div className="smoke one"></div><div className="smoke two"></div><div className="smoke three"></div></div><div className="load">Cargando...</div></div>
          </div>
        ) : !sistemaActivo ? (
          <div className="text-center py-4">
            <div className="text-5xl mb-4">🚫</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Sistema no disponible</h2>
            <p className="text-gray-500 text-sm">El sistema de mozos no está habilitado para este restaurante.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="text-5xl mb-3">👨‍🍳</div>
              <h1 className="text-2xl font-bold text-gray-800">Acceso Mozos</h1>
              <p className="text-gray-500 text-sm mt-1">{slug}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 text-lg font-bold disabled:opacity-50"
              >
                {loading ? "Ingresando..." : "Ingresar"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
