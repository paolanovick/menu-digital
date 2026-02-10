import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Utensils } from "lucide-react";
import { getCategorias } from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";

export default function SidebarMenu({ isOpen, onClose, restaurante }) {
  // Inicializamos siempre como array vacío para evitar el error de .map
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const slug = location.pathname.split("/")[1];

  useEffect(() => {
    if (!isOpen || !restaurante?._id) {
      if (!isOpen) {
        // Opcional: limpiar al cerrar para recargar fresco la próxima vez
        // setCategorias([]);
      }
      return;
    }

    const fetchCategorias = async () => {
      setLoading(true);
      try {
        const res = await getCategorias(restaurante._id);

        // --- SOLUCIÓN ERROR MAP ---
        // Verificamos si res.data es un array. Si no, intentamos buscar una propiedad interna
        // o asignamos un array vacío para que no rompa la página.
        if (Array.isArray(res.data)) {
          setCategorias(res.data);
        } else if (res.data && Array.isArray(res.data.categorias)) {
          // A veces las APIs devuelven { success: true, categorias: [...] }
          setCategorias(res.data.categorias);
        } else if (res.data && Array.isArray(res.data.data)) {
          // O devuelven { data: [...] }
          setCategorias(res.data.data);
        } else {
          console.error("Formato de categorías inesperado:", res.data);
          setCategorias([]);
        }
      } catch (err) {
        console.error("Error cargando categorías:", err);
        setCategorias([]); // En caso de error, aseguramos array vacío
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, [restaurante, isOpen]);

  const handleCategoryClick = (categoriaId) => {
    onClose();
    const isRootRoute =
      location.pathname === `/${slug}` || location.pathname === `/${slug}/`;

    if (isRootRoute) {
      const targetId = categoriaId === "top" ? "app-root" : categoriaId;
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (categoriaId === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      navigate(`/${slug}`);
    }
  };

  // --- ANIMACION DERECHA ---
  const sidebarVariants = {
    // 100% significa que empieza escondido a la derecha
    closed: {
      x: "100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />

          {/* Menú Lateral - AHORA A LA DERECHA (right-0) */}
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 right-0 h-full w-[80%] max-w-xs bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header del Menú - Invertimos orden: Titulo izq, cerrar der */}
            <div className="p-4 border-b flex items-center justify-between bg-gray-50">
              <span className="font-bold text-lg text-gray-800">Menú</span>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Categorías
              </h3>

              {loading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                </div>
              ) : (
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => handleCategoryClick("top")}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Utensils
                          size={18}
                          className="text-gray-400 group-hover:text-orange-500"
                        />
                        <span className="font-medium">Ver todo</span>
                      </div>
                    </button>
                  </li>

                  {/* Renderizado defensivo: solo si categorias es array y tiene longitud */}
                  {Array.isArray(categorias) &&
                    categorias.map((cat) => (
                      <li key={cat._id}>
                        <button
                          onClick={() => handleCategoryClick(cat._id)}
                          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            {cat.imagen ? (
                              <img
                                src={cat.imagen}
                                alt=""
                                className="w-5 h-5 object-cover rounded"
                              />
                            ) : (
                              <div className="w-5 h-5 bg-gray-200 rounded-full" />
                            )}
                            <span className="font-medium">{cat.nombre}</span>
                          </div>
                          <ChevronRight
                            size={16}
                            className="text-gray-300 group-hover:text-orange-400"
                          />
                        </button>
                      </li>
                    ))}
                </ul>
              )}
            </div>

            <div className="p-4 border-t text-center text-xs text-gray-400">
              {restaurante?.nombre}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
