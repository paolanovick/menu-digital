import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Utensils, Home } from "lucide-react";
import { getCategorias } from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";

export default function SidebarMenu({ isOpen, onClose, restaurante }) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const slug = location.pathname.split("/")[1];

  useEffect(() => {
    if (!isOpen || !restaurante?._id) {
      return;
    }

    if (categorias.length > 0) {
      return;
    }

    const fetchCategorias = async () => {
      setLoading(true);
      try {
        const res = await getCategorias(restaurante._id);

        let data = res.data;

        if (data && !Array.isArray(data)) {
          data = data.categorias || data.data || data.results || [];
        }

        if (Array.isArray(data)) {
          setCategorias(data);
        } else {
          console.error("Formato de categorías inesperado:", res.data);
          setCategorias([]);
        }
      } catch (err) {
        console.error("Error cargando categorías:", err);
        setCategorias([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, [restaurante, isOpen, categorias.length]);

  // Navegar al inicio
  const handleGoHome = () => {
    onClose();
    navigate(`/${slug}`);
  };

  // Navegar a una categoría
  const handleCategoryClick = (categoria) => {
    onClose();

    const categoriaSlug = categoria.nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");

    navigate(`/${slug}/categoria/${categoriaSlug}`, {
      state: {
        categoriaId: categoria._id,
        categoriaNombre: categoria.nombre,
      },
    });
  };

  // Navegar a delivery
  const handleDeliveryClick = () => {
    onClose();
    navigate(`/${slug}/delivery`);
  };

  const sidebarVariants = {
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.05 },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop oscuro */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header del Sidebar */}
            <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-wine to-wine-dark">
              <div className="flex items-center gap-3">
                {restaurante?.logo ? (
                  <img
                    src={restaurante.logo}
                    alt={restaurante.nombre}
                    className="h-10 w-10 object-contain bg-white rounded-lg p-1"
                  />
                ) : (
                  <span className="text-2xl">🍽️</span>
                )}
                <span className="font-bold text-lg text-white">
                  {restaurante?.nombre || "Menú"}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Lista de Categorías */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                  Navegar
                </h3>

                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wine"></div>
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {/* Opción Inicio */}
                    <motion.li
                      custom={0}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                    >
                      <button
                        onClick={handleGoHome}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-wine/10 text-gray-700 hover:text-wine transition-all group"
                      >
                        <div className="w-10 h-10 bg-wine/10 rounded-lg flex items-center justify-center group-hover:bg-wine/20 transition-colors">
                          <Home size={20} className="text-wine" />
                        </div>
                        <span className="font-medium">Inicio</span>
                      </button>
                    </motion.li>

                    {/* Separador */}
                    <div className="my-3 border-t border-gray-100"></div>

                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                      Categorías
                    </h3>

                    {/* Categorías Dinámicas */}
                    {Array.isArray(categorias) &&
                      categorias.map((cat, index) => (
                        <motion.li
                          key={cat._id}
                          custom={index + 1}
                          variants={itemVariants}
                          initial="closed"
                          animate="open"
                        >
                          <button
                            onClick={() => handleCategoryClick(cat)}
                            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-wine/10 text-gray-700 hover:text-wine transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden group-hover:bg-wine/10 transition-colors text-2xl">
                                {cat.icono || (
                                  <Utensils
                                    size={18}
                                    className="text-gray-400 group-hover:text-wine"
                                  />
                                )}
                              </div>
                              <span className="font-medium">{cat.nombre}</span>
                            </div>
                            <ChevronRight
                              size={18}
                              className="text-gray-300 group-hover:text-wine group-hover:translate-x-1 transition-all"
                            />
                          </button>
                        </motion.li>
                      ))}

                    {/* Delivery si está activo */}
                    {restaurante?.deliveryActivo && (
                      <>
                        <div className="my-3 border-t border-gray-100"></div>
                        <motion.li
                          custom={categorias.length + 1}
                          variants={itemVariants}
                          initial="closed"
                          animate="open"
                        >
                          <button
                            onClick={handleDeliveryClick}
                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 text-gray-700 hover:text-green-600 transition-all group"
                          >
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors text-2xl">
                              🚚
                            </div>
                            <span className="font-medium">Delivery</span>
                          </button>
                        </motion.li>
                      </>
                    )}

                    {/* Mensaje si no hay categorías */}
                    {!loading && categorias.length === 0 && (
                      <li className="text-center py-4 text-gray-400">
                        No hay categorías disponibles
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>

            {/* Footer del Sidebar */}
            <div className="p-4 border-t bg-gray-50">
              <p className="text-center text-xs text-gray-400">
                Powered by MenuDigital
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
