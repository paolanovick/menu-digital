import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { MapPin, Phone, Mail, Clock, QrCode } from "lucide-react";
import InteractiveSection from "../components/InteractiveSection";

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

  // Sección QR/Delivery que estaba en Home
  const tieneDelivery = restaurante.deliveryActivo !== false;

  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600">
      <div className="container mx-auto px-4 py-8">
        {/* Grid principal - 4 columnas en desktop, 2 en tablet, 1 en móvil */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Columna 1: Logo y Descripción */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {restaurante.logo ? (
                <img
                  src={restaurante.logo}
                  alt={restaurante.nombre}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <div className="text-3xl">🍽️</div>
              )}
              <h3 className="text-base font-medium text-gray-800">
                {restaurante.nombre}
              </h3>
            </div>

           

            {/* Redes Sociales */}
            <div className="flex gap-3 pt-2">
              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-600 transition-colors"
                  title="WhatsApp"
                >
                  <FaWhatsapp size={18} />
                </a>
              )}
              {instagramLink && (
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-600 transition-colors"
                  title="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
              )}
              {facebookLink && (
                <a
                  href={facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  title="Facebook"
                >
                  <FaFacebook size={18} />
                </a>
              )}
            </div>
            {/* Sección Interactiva */}
            <InteractiveSection restaurante={restaurante} />
          </div>

          {/* Columna 2: Contacto */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-800 uppercase tracking-wide">
              Contacto
            </h4>
            <div className="space-y-3">
              {restaurante.contacto?.direccion?.calle && (
                <div className="flex items-start gap-2 text-sm">
                  <MapPin
                    size={16}
                    className="mt-0.5 flex-shrink-0 text-gray-400"
                  />
                  <span className="text-gray-600">
                    {restaurante.contacto.direccion.calle}
                    {restaurante.contacto.direccion.ciudad &&
                      `, ${restaurante.contacto.direccion.ciudad}`}
                  </span>
                </div>
              )}

              {restaurante.contacto?.telefono && (
                <a
                  href={`tel:${restaurante.contacto.telefono}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
                >
                  <Phone size={16} className="text-gray-400" />
                  <span>{restaurante.contacto.telefono}</span>
                </a>
              )}

              {restaurante.contacto?.email && (
                <a
                  href={`mailto:${restaurante.contacto.email}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
                >
                  <Mail size={16} className="text-gray-400" />
                  <span>{restaurante.contacto.email}</span>
                </a>
              )}
            </div>
          </div>

          {/* Columna 3: Horarios (compacto) */}
          {tieneHorarios && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-800 uppercase tracking-wide flex items-center gap-2">
                <Clock size={16} />
                Horarios
              </h4>
              <div className="space-y-2">
                {diasSemana.map(({ key, label }) => {
                  const horario = restaurante.horarios?.[key];
                  const estaAbierto =
                    horario?.abierto !== false && horario?.apertura;

                  return (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-600">{label}</span>
                      {estaAbierto ? (
                        <span className="text-gray-800 font-normal">
                          {horario.apertura} - {horario.cierre}
                        </span>
                      ) : (
                        <span className="text-gray-400">Cerrado</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Columna 4: QR y Delivery (la que estaba en Home) */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-800 uppercase tracking-wide flex items-center gap-2">
              <QrCode size={16} />
              Menú Digital
            </h4>

            <div className="space-y-4">
              QR Code
              <div className="flex flex-col items-center space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="bg-white p-3 rounded-lg border border-gray-300">
                  {/* Aquí iría tu componente QR */}
                  <div className="w-32 h-32 flex items-center justify-center bg-white text-gray-400 border border-dashed border-gray-300 rounded">
                    QR Code
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Escanea para ver el menú en tu celular
                </p>
              </div>
              {/* Delivery Status */}
              {tieneDelivery && (
                <div className="text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Delivery disponible</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} {restaurante.nombre}. Todos los
              derechos reservados.
            </p>
            <p className="text-xs text-gray-400">
              Powered by <span className="font-medium">ConCodigoART</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
