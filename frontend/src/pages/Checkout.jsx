import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { getRestauranteBySlug } from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ThemeProvider } from "../context/ThemeContext";
import { useCart } from "../context/useCart";

export default function Checkout() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, totalPrecio, clearCart } =
    useCart();

  const [restaurante, setRestaurante] = useState(null);
  const [formData, setFormData] = useState({
    direccion: "",
    telefono: "",
    email: "",
    notas: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const resRest = await getRestauranteBySlug(slug);
      setRestaurante(resRest.data.data);
    };
    fetchData();
  }, [slug]);

  useEffect(() => {
    if (items.length === 0) {
      navigate(`/${slug}/delivery`);
    }
  }, [items, navigate, slug]);

  const handleConfirmarPedido = () => {
    const restauranteData = JSON.parse(
      localStorage.getItem("restauranteData") || "{}",
    );
    const whatsapp = restauranteData.whatsapp || "5491123456789";

    let mensaje = "🛒 *NUEVO PEDIDO*\n\n";

    items.forEach((item) => {
      mensaje += `• ${item.cantidad}x ${item.nombre} - $${(item.precio * item.cantidad).toLocaleString("es-AR")}\n`;
    });

    mensaje += `\n*Subtotal: $${totalPrecio.toLocaleString("es-AR")}*\n`;
    mensaje += `*Envío: A calcular*\n`;
    mensaje += `*TOTAL: $${totalPrecio.toLocaleString("es-AR")}*\n\n`;
    mensaje += `📍 *Dirección:* ${formData.direccion || "[Sin especificar]"}\n`;
    mensaje += `📞 *Teléfono:* ${formData.telefono || "[Sin especificar]"}\n`;
    if (formData.email) mensaje += `📧 *Email:* ${formData.email}\n`;
    if (formData.notas) mensaje += `\n📝 *Notas:* ${formData.notas}`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    window.open(
      `https://wa.me/${whatsapp}?text=${mensajeCodificado}`,
      "_blank",
    );
  };

  if (!restaurante) return null;


  return (
    <ThemeProvider tema={restaurante.tema}>
      <div
        className="min-h-screen relative"
        style={{
          backgroundImage: "url(/backgroundMantel.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-cream opacity-90 -z-10"></div>

        <Header restaurante={restaurante} />

        <div className="container mx-auto px-4 py-8">
          {/* Botón volver */}
          <button
            onClick={() => navigate(`/${slug}/delivery`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors font-semibold"
          >
            <ArrowLeft size={20} />
            Seguir comprando
          </button>

          {/* Layout */}
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-3xl font-bold mb-8 text-center text-wine">
              🛒 Carrito de Compras
            </h1>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
              {/* Lista de productos */}
              <div className="mb-8">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item._id} className="flex gap-4 pb-4 border-b">
                      {/* Imagen */}
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.imagen ? (
                          <img
                            src={item.imagen}
                            alt={item.nombre}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl">
                            🍽️
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">
                          {item.nombre}
                        </h3>
                        <p className="text-wine font-bold text-lg mb-3">
                          ${item.precio.toLocaleString("es-AR")}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateQuantity(item._id, item.cantidad - 1)
                              }
                              className="w-8 h-8 bg-wine text-white rounded-full flex items-center justify-center hover:bg-wine-dark transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center font-bold text-lg">
                              {item.cantidad}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item._id, item.cantidad + 1)
                              }
                              className="w-8 h-8 bg-wine text-white rounded-full flex items-center justify-center hover:bg-wine-dark transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-red-500 hover:text-red-700 p-2"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totales */}
              <div className="mb-8 p-6 bg-cream/50 rounded-xl">
                <div className="flex justify-between text-lg mb-2">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="font-bold">
                    ${totalPrecio.toLocaleString("es-AR")}
                  </span>
                </div>
                <div className="flex justify-between text-lg mb-4">
                  <span className="text-gray-700">Envío:</span>
                  <span className="font-bold text-green-600">A coordinar</span>
                </div>
                <div className="border-t-2 border-wine/20 pt-4 flex justify-between">
                  <span className="font-bold text-2xl">Total:</span>
                  <span className="font-bold text-3xl text-wine">
                    ${totalPrecio.toLocaleString("es-AR")}
                  </span>
                </div>
              </div>
              {/* Formulario */}
              <div className="space-y-4 mb-8">
                <h3 className="font-bold text-xl mb-4">Datos de entrega</h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Dirección *
                  </label>
                  <input
                    type="text"
                    value={formData.direccion}
                    onChange={(e) =>
                      setFormData({ ...formData, direccion: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                    placeholder="Ej: Avenida Siempre Viva 123, Depto 4B"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Teléfono (opcional)
                    </label>
                    <input
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) =>
                        setFormData({ ...formData, telefono: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                      placeholder="+54 9 11 1234-5678"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email (opcional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notas
                  </label>
                  <textarea
                    value={formData.notas}
                    onChange={(e) =>
                      setFormData({ ...formData, notas: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent"
                    rows="3"
                    placeholder="Indicaciones, sin cebolla, timbre roto, etc..."
                  ></textarea>
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-4">
                <button
                  onClick={clearCart}
                  className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-300 transition-all"
                >
                  Vaciar carrito
                </button>

                <button
                  onClick={handleConfirmarPedido}
                  disabled={!formData.direccion}
                  className="flex-1 bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Confirmar y enviar por WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer restaurante={restaurante} />
      </div>
    </ThemeProvider>
  );
}
