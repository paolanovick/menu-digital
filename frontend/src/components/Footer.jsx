import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer({ restaurante }) {
  const whatsappLink = restaurante.contacto?.whatsapp 
    ? `https://wa.me/${restaurante.contacto.whatsapp}`
    : null;

  const instagramLink = restaurante.redesSociales?.instagram
    ? `https://instagram.com/${restaurante.redesSociales.instagram}`
    : null;

  const facebookLink = restaurante.redesSociales?.facebook
    ? `https://facebook.com/${restaurante.redesSociales.facebook}`
    : null;

  return (
    <footer
      className="
  mt-20
  border-t
  border-gray-200
  bg-cream
  text-gray-600
"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Logo y Descripción */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {restaurante.logo ? (
                <img
                  src={restaurante.logo}
                  alt={restaurante.nombre}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <div className="text-4xl">🍽️</div>
              )}
              <h3 className="font-display text-xl font-semibold tracking-tight text-gray-700">
                {restaurante.nombre}
              </h3>
            </div>
            {restaurante.descripcion && (
              <p className="text-sm leading-relaxed text-gray-500">
                {restaurante.descripcion}
              </p>
            )}
          </div>

          {/* Columna 2: Contacto */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-5">
              Contacto
            </h4>
            <div className="space-y-3">
              {restaurante.contacto?.direccion?.calle && (
                <div className="flex items-start gap-3 text-sm text-gray-500">
                  <MapPin size={18} className="mt-1 flex-shrink-0" />
                  <span className="text-sm">
                    {restaurante.contacto.direccion.calle}
                    {restaurante.contacto.direccion.ciudad &&
                      `, ${restaurante.contacto.direccion.ciudad}`}
                  </span>
                </div>
              )}

              {restaurante.contacto?.telefono && (
                <a
                  href={`tel:${restaurante.contacto.telefono}`}
                  className="flex items-center gap-2 text-gray-300 hover:text-black transition-colors"
                >
                  <Phone size={18} />
                  <span className="text-sm">
                    {restaurante.contacto.telefono}
                  </span>
                </a>
              )}

              {restaurante.contacto?.email && (
                <a
                  href={`mailto:${restaurante.contacto.email}`}
                  className="flex items-center gap-2 text-gray-300 hover:text-black transition-colors"
                >
                  <Mail size={18} />
                  <span className="text-sm">{restaurante.contacto.email}</span>
                </a>
              )}
            </div>
          </div>

          {/* Columna 3: Redes Sociales y Horarios */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-5">
              Síguenos
            </h4>
            <div className="flex gap-4 mb-6">
              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 p-3 rounded-full transition-colors"
                  title="WhatsApp"
                >
                  <FaWhatsapp size={20} />
                </a>
              )}

              {instagramLink && (
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
  p-3
  rounded-full
  border
  border-gray-300
  text-gray-500
  hover:text-wine
  hover:border-wine
  transition-colors
"
                  title="Instagram"
                >
                  <FaInstagram size={20} />
                </a>
              )}

              {facebookLink && (
                <a
                  href={facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors"
                  title="Facebook"
                >
                  <FaFacebook size={20} />
                </a>
              )}
            </div>

            {/* Horarios */}
            {restaurante.horarios?.lunes && (
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                  Horarios
                </h5>
                <p className="text-xs text-gray-300">
                  Lunes a Viernes: {restaurante.horarios.lunes.apertura} -{" "}
                  {restaurante.horarios.lunes.cierre}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} {restaurante.nombre}. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}