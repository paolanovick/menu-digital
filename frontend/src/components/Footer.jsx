import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
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

  // Días de la semana en orden
  const diasSemana = [
    { key: "lunes", label: "Lunes" },
    { key: "martes", label: "Martes" },
    { key: "miercoles", label: "Miércoles" },
    { key: "jueves", label: "Jueves" },
    { key: "viernes", label: "Viernes" },
    { key: "sabado", label: "Sábado" },
    { key: "domingo", label: "Domingo" },
  ];

  // Verificar si hay horarios configurados
  const tieneHorarios =
    restaurante.horarios &&
    Object.keys(restaurante.horarios).some(
      (dia) =>
        restaurante.horarios[dia]?.apertura ||
        restaurante.horarios[dia]?.abierto,
    );

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 text-gray-600">
      <div className="container mx-auto px-4 py-10 md:py-16">
        {/* Layout Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-8">
          {/* Columna 1: Logo y Descripción - Ocupa toda la fila en móvil */}
          <div className="lg:col-span-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              {restaurante.logo ? (
                <img
                  src={restaurante.logo}
                  alt={restaurante.nombre}
                  className="h-16 w-auto object-contain max-w-[200px]"
                />
              ) : (
                <div className="text-5xl">🍽️</div>
              )}
              <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-800">
                {restaurante.nombre}
              </h3>
            </div>

            {restaurante.descripcion && (
              <p className="text-base leading-relaxed text-gray-500 mb-6">
                {restaurante.descripcion}
              </p>
            )}

            {/* Redes Sociales - Móvil: debajo del logo, Desktop: mantiene posición */}
            <div className="flex gap-4 mb-8 lg:mb-0">
              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-md"
                  title="WhatsApp"
                >
                  <FaWhatsapp size={22} className="text-white" />
                </a>
              )}

              {instagramLink && (
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-md"
                  title="Instagram"
                >
                  <FaInstagram size={22} className="text-white" />
                </a>
              )}

              {facebookLink && (
                <a
                  href={facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-md"
                  title="Facebook"
                >
                  <FaFacebook size={22} className="text-white" />
                </a>
              )}
            </div>
          </div>

          {/* Columna 2: Contacto */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold text-gray-800 mb-6 pb-2 border-b border-gray-300">
              Contacto
            </h4>
            <div className="space-y-5">
              {restaurante.contacto?.direccion?.calle && (
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <MapPin size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Dirección</p>
                    <p className="text-gray-500 text-sm mt-1">
                      {restaurante.contacto.direccion.calle}
                      {restaurante.contacto.direccion.ciudad &&
                        `, ${restaurante.contacto.direccion.ciudad}`}
                      {restaurante.contacto.direccion.provincia &&
                        `, ${restaurante.contacto.direccion.provincia}`}
                    </p>
                  </div>
                </div>
              )}

              {restaurante.contacto?.telefono && (
                <a
                  href={`tel:${restaurante.contacto.telefono}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="bg-gray-100 p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                    <Phone
                      size={18}
                      className="text-gray-600 group-hover:text-blue-600"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      Teléfono
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      {restaurante.contacto.telefono}
                    </p>
                  </div>
                </a>
              )}

              {restaurante.contacto?.email && (
                <a
                  href={`mailto:${restaurante.contacto.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="bg-gray-100 p-2 rounded-full group-hover:bg-red-50 transition-colors">
                    <Mail
                      size={18}
                      className="text-gray-600 group-hover:text-red-600"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                      Email
                    </p>
                    <p className="text-gray-500 text-sm mt-1 break-all">
                      {restaurante.contacto.email}
                    </p>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Columna 3: Horarios */}
          <div className="lg:col-span-1">
            {tieneHorarios && (
              <>
                <h4 className="text-lg font-bold text-gray-800 mb-6 pb-2 border-b border-gray-300 flex items-center gap-2">
                  <Clock size={20} />
                  Horarios de Atención
                </h4>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                  <div className="space-y-3">
                    {diasSemana.map(({ key, label }) => {
                      const horario = restaurante.horarios?.[key];
                      const estaAbierto =
                        horario?.abierto !== false && horario?.apertura;

                      return (
                        <div
                          key={key}
                          className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                        >
                          <span className="font-medium text-gray-700">
                            {label}
                          </span>
                          {estaAbierto ? (
                            <div className="flex flex-col items-end">
                              <span className="text-green-600 font-bold">
                                {horario.apertura} - {horario.cierre}
                              </span>
                              <span className="text-xs text-green-500 bg-green-50 px-2 py-1 rounded-full mt-1">
                                Abierto
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-end">
                              <span className="text-red-500 font-bold">
                                Cerrado
                              </span>
                              <span className="text-xs text-red-400 bg-red-50 px-2 py-1 rounded-full mt-1">
                                No hay atención
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} {restaurante.nombre}. Todos los
              derechos reservados.
            </p>
            <div className="text-sm text-gray-400">
              <span className="hidden md:inline">•</span>
              <span className="mx-2">Menú Digital v1.0</span>
              <span className="hidden md:inline">•</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
