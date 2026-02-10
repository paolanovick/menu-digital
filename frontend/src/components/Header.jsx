import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { ShoppingCart, Menu } from "lucide-react";
import { useCart } from "../context/useCart";
import SidebarMenu from "./SidebarMenu";

export default function Header({ restaurante }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const isDeliveryPage = location.pathname.includes("/delivery");

  const whatsappLink = restaurante?.contacto?.whatsapp
    ? `https://wa.me/${restaurante.contacto.whatsapp}`
    : null;

  const instagramLink = restaurante?.redesSociales?.instagram
    ? `https://instagram.com/${restaurante.redesSociales.instagram}`
    : null;

  const slug = location.pathname.split("/")[1];

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* --- IZQUIERDA: LOGO --- */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate(`/${slug}`)}
            >
              {restaurante?.logo ? (
                <img
                  src={restaurante.logo}
                  alt={restaurante.nombre}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <div className="text-3xl">🍽️</div>
              )}
            </div>

            {/* --- DERECHA: ICONOS + HAMBURGUESA --- */}
            <div className="flex items-center gap-3">
              {/* WhatsApp */}
              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-full transition-all"
                  title="WhatsApp"
                >
                  <FaWhatsapp size={22} />
                </a>
              )}

              {/* Instagram */}
              {instagramLink && (
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-pink-600 hover:text-pink-700 hover:bg-pink-50 rounded-full transition-all"
                  title="Instagram"
                >
                  <FaInstagram size={22} />
                </a>
              )}

              {/* Carrito (solo en delivery) */}
              {isDeliveryPage && totalItems > 0 && (
                <button
                  onClick={() => navigate(`/${slug}/checkout`)}
                  className="relative flex items-center gap-2 bg-orange-500 text-white px-3 py-2 rounded-full hover:bg-orange-600 transition-all shadow-md hover:shadow-lg"
                >
                  <ShoppingCart size={18} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {totalItems}
                  </span>
                </button>
              )}

              {/* BOTÓN HAMBURGUESA - A LA DERECHA */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors"
                aria-label="Abrir menú"
              >
                <Menu size={26} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Menu */}
      <SidebarMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        restaurante={restaurante}
      />
    </>
  );
}
