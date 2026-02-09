import { useLocation, useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/useCart';

export default function Header({ restaurante }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  
  const isDeliveryPage = location.pathname.includes('/delivery');

  const whatsappLink = restaurante.contacto?.whatsapp 
    ? `https://wa.me/${restaurante.contacto.whatsapp}`
    : null;

  const instagramLink = restaurante.redesSociales?.instagram
    ? `https://instagram.com/${restaurante.redesSociales.instagram}`
    : null;

  // Extraer slug de la URL
  const slug = location.pathname.split('/')[1];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
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

          {/* Icons derecha */}
          <div className="flex items-center gap-4">
            {/* WhatsApp */}
            {whatsappLink && (
              
               <a href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                title="WhatsApp"
              >
                <FaWhatsapp size={24} />
              </a>
            )}

            {/* Instagram */}
            {instagramLink && (
              
              <a  href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
                title="Instagram"
              >
                <FaInstagram size={24} />
              </a>
            )}

            {/* Carrito (solo en delivery) */}
            {isDeliveryPage && totalItems > 0 && (
              <button
                onClick={() => navigate(`/${slug}/checkout`)}
                className="relative flex items-center gap-2 bg-wine text-white px-4 py-2 rounded-full hover:bg-wine-dark transition-all shadow-md hover:shadow-lg"
              >
                <ShoppingCart size={20} />
                <span className="font-semibold hidden sm:inline">Carrito</span>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                  {totalItems}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}