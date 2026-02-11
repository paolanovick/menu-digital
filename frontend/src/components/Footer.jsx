import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaStar,
  FaShare,
} from "react-icons/fa";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

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

  const diasSemana = [
    { key: "lunes", label: "Lun" },
    { key: "martes", label: "Mar" },
    { key: "miercoles", label: "Mié" },
    { key: "jueves", label: "Jue" },
    { key: "viernes", label: "Vie" },
    { key: "sabado", label: "Sáb" },
    { key: "domingo", label: "Dom" },
  ];

  const tieneHorarios =
    restaurante.horarios &&
    Object.keys(restaurante.horarios).some(
      (dia) =>
        restaurante.horarios[dia]?.apertura ||
        restaurante.horarios[dia]?.abierto,
    );

  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600">
      <div className="container mx-auto px-6 py-10">
        {/* Grid principal - 4 columnas en md, 1 en mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
          {/* Columna 1: Logo simplificado */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {restaurante.logo ? (
                <img
                  src={restaurante.logo}
                  alt={restaurante.nombre}
                  className="h-20 w-auto object-contain"
                />
              ) : (
                <div className="text-4xl text-gray-400">🍽️</div>
              )}
            </div>
            <div className="text-xs text-gray-400 font-light italic">
              "El sabor del mundo en cada bocado"
            </div>
          </div>

          {/* Columna 2: Contacto - Más limpio */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
              Contacto
            </h4>

            {restaurante.contacto?.direccion?.calle && (
              <div className="flex items-start gap-3 text-sm group">
                <MapPin
                  size={16}
                  className="mt-0.5 flex-shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors"
                />
                <span className="text-gray-600 group-hover:text-gray-900 transition-colors">
                  {restaurante.contacto.direccion.calle}
                  {restaurante.contacto.direccion.ciudad &&
                    `, ${restaurante.contacto.direccion.ciudad}`}
                </span>
              </div>
            )}

            {restaurante.contacto?.telefono && (
              <a
                href={`tel:${restaurante.contacto.telefono}`}
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 transition-all group"
              >
                <Phone
                  size={16}
                  className="text-gray-400 group-hover:text-gray-600 transition-colors"
                />
                <span className="group-hover:translate-x-1 transition-transform inline-block">
                  {restaurante.contacto.telefono}
                </span>
              </a>
            )}

            {restaurante.contacto?.email && (
              <a
                href={`mailto:${restaurante.contacto.email}`}
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 transition-all group"
              >
                <Mail
                  size={16}
                  className="text-gray-400 group-hover:text-gray-600 transition-colors"
                />
                <span className="group-hover:translate-x-1 transition-transform inline-block">
                  {restaurante.contacto.email}
                </span>
              </a>
            )}
          </div>

          {/* Columna 3: Horarios - Compacto y elegante */}
          {tieneHorarios && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider flex items-center gap-2 mb-4">
                <Clock size={16} className="text-gray-500" />
                Horarios
              </h4>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="space-y-1.5">
                  {diasSemana.map(({ key, label }) => {
                    const horario = restaurante.horarios?.[key];
                    const estaAbierto =
                      horario?.abierto !== false && horario?.apertura;

                    return (
                      <div
                        key={key}
                        className="flex justify-between items-center text-xs"
                      >
                        <span className="text-gray-500 font-medium">
                          {label}
                        </span>
                        {estaAbierto ? (
                          <span className="text-gray-700 bg-white px-2 py-0.5 rounded-full border border-gray-200">
                            {horario.apertura}-{horario.cierre}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic text-[11px]">
                            Cerrado
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Columna 4: Compartir y Calificación - Más vistoso pero con colores claros */}
          <div className="space-y-6">
            {/* Redes Sociales con estilo */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider flex items-center gap-2 mb-4">
                <FaShare size={14} className="text-gray-500" />
                Compartir
              </h4>
              <div className="flex gap-3">
                {whatsappLink && (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-3 rounded-lg text-gray-500 hover:bg-green-500 hover:text-white transition-all transform hover:scale-110 hover:shadow-md"
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
                    className="bg-gray-100 p-3 rounded-lg text-gray-500 hover:bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 hover:text-white transition-all transform hover:scale-110 hover:shadow-md"
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
                    className="bg-gray-100 p-3 rounded-lg text-gray-500 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110 hover:shadow-md"
                    title="Facebook"
                  >
                    <FaFacebook size={20} />
                  </a>
                )}
              </div>
            </div>

            {/* Calificación con estilo suave */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <span className="text-gray-800 text-sm font-semibold">4.8</span>
              </div>
              <p className="text-xs text-gray-500">
                Calificación excelente basada en +500 reseñas
              </p>
              <button className="mt-3 text-xs bg-white hover:bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full transition-all flex items-center gap-2 border border-gray-300">
                <span>Deja tu reseña</span>
                <span className="text-gray-500">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="relative py-4">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 pt-4">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} {restaurante.nombre}. Todos los
              derechos reservados.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Powered by</span>
              <span className="text-sm font-semibold text-gray-700">
                ConCodigoART
              </span>
              <span className="text-gray-400">✨</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
