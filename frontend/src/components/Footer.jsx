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
      <div className="container mx-auto px-4 py-6">
        {/* Grid principal - 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Columna 1: Logo y Redes */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {restaurante.logo ? (
                <img
                  src={restaurante.logo}
                  alt={restaurante.nombre}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <div className="text-2xl">🍽️</div>
              )}
              <h3 className="text-base font-medium text-gray-800">
                {restaurante.nombre}
              </h3>
            </div>

            {/* Redes Sociales */}
            <div className="flex gap-3">
              {whatsappLink && (
                
                <a  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-600 transition-colors"
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
                  className="text-gray-400 hover:text-pink-600 transition-colors"
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
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  title="Facebook"
                >
                  <FaFacebook size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Columna 2: Contacto */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gray-800 uppercase tracking-wide mb-3">
              Contacto
            </h4>
            
            {restaurante.contacto?.direccion?.calle && (
              <div className="flex items-start gap-2 text-sm">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-gray-400" />
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
                <Phone size={14} className="text-gray-400" />
                <span>{restaurante.contacto.telefono}</span>
              </a>
            )}

            {restaurante.contacto?.email && (
              
              <a  href={`mailto:${restaurante.contacto.email}`}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
              >
                <Mail size={14} className="text-gray-400" />
                <span>{restaurante.contacto.email}</span>
              </a>
            )}
          </div>

          {/* Columna 3: Horarios compactos */}
          {tieneHorarios && (
            <div>
              <h4 className="text-xs font-medium text-gray-800 uppercase tracking-wide flex items-center gap-1 mb-3">
                <Clock size={14} />
                Horarios
              </h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                {diasSemana.map(({ key, label }) => {
                  const horario = restaurante.horarios?.[key];
                  const estaAbierto =
                    horario?.abierto !== false && horario?.apertura;

                  return (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-500">{label}</span>
                      {estaAbierto ? (
                        <span className="text-gray-700">
                          {horario.apertura}-{horario.cierre}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} {restaurante.nombre}
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