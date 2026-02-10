import { useState } from "react"; // Importar useState
import { useLocation, useNavigate } from "react-router-dom";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { ShoppingCart, Menu } from "lucide-react"; // Importar icono Menu
import { useCart } from "../context/useCart";
import SidebarMenu from "./SidebarMenu"; // Importar el nuevo componente

export default function Header({ restaurante }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado del menú
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const isDeliveryPage = location.pathname.includes("/delivery");

  const whatsappLink = restaurante.contacto?.whatsapp
    ? `https://wa.me/${restaurante.contacto.whatsapp}`
    : null;

  const instagramLink = restaurante.redesSociales?.instagram
    ? `https://instagram.com/${restaurante.redesSociales.instagram}`
    : null;

  // Extraer slug de la URL
  const slug = location.pathname.split("/")[1];

  return (
    <>
      {/* 1. Header Visible */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* IZQUIERDA: Menú Hamburguesa y Logo */}
            <div className="flex items-center gap-3">
              {/* Botón Hamburguesa */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-1 hover:bg-gray-100 rounded-md text-gray-700 transition-colors"
                aria-label="Abrir menú"
              >
                <Menu size={28} />
              </button>

              {/* Logo (Puede ser clickeable para ir al home) */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate(`/${slug}`)}
              >
                {restaurante.logo ? (
                  <img
                    src={restaurante.logo}
                    alt={restaurante.nombre}
                    className="h-10 w-auto object-contain"
                  />
                ) : (
                  <div className="text-3xl">🍽️</div>
                )}
              </div>
            </div>

            {/* DERECHA: Iconos */}
            <div className="flex items-center gap-4">
              {/* WhatsApp (Ocultar en móviles muy pequeños si falta espacio, opcional) */}
              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                  title="WhatsApp"
                >
                  <FaWhatsapp size={24} />
                </a>
              )}

              {/* Instagram */}
              {instagramLink && (
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
                  title="Instagram"
                >
                  <FaInstagram size={24} />
                </a>
              )}

              {/* Carrito (solo en delivery) */}
              {isDeliveryPage && totalItems > 0 && (
                <button
                  onClick={() => navigate(`/${slug}/checkout`)}
                  className="relative flex items-center gap-2 bg-wine text-white px-3 py-2 rounded-full hover:bg-wine-dark transition-all shadow-md hover:shadow-lg"
                >
                  <ShoppingCart size={20} />
                  {/* Texto oculto en móviles para ahorrar espacio */}
                  <span className="font-semibold hidden md:inline">
                    Carrito
                  </span>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {totalItems}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Componente del Menú Lateral */}
      <SidebarMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        restaurante={restaurante}
      />
    </>
  );
}
