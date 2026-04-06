---
name: paola-web-design
description: Estilo de diseño y desarrollo web de Paola (Con Código Art). Usar SIEMPRE cuando se trabaje en cualquier proyecto de Paola: Vagabundo Pet Shop, laEugenia, Dalirium, TravelConnect, ADUCMA, Con Código Art, o cualquier cliente nuevo. Aplica convenciones de diseño, stack técnico, patrones de componentes y reglas de deploy que Paola usa consistentemente en todos sus proyectos.
---

# Skill: Estilo Web de Paola — Con Código Art

## Stack técnico estándar

- **Frontend**: React + Vite, CSS Modules o Tailwind CSS
- **Backend**: Node.js + Express
- **Base de datos**: MongoDB Atlas con Mongoose
- **Imágenes**: Cloudinary (con compresión al subir)
- **Deploy**: Vercel (proyectos completos o solo frontend) o Digital Ocean (Ubuntu, PM2, Node.js)
- Variables Vercel: prefijo `VITE_*` para frontend, sin prefijo para backend/serverless
- **Automatización**: n8n para webhooks y flujos
- **Control de versiones**: GitHub → pull manual en el servidor

## Infraestructura del servidor (Digital Ocean)

Puertos asignados por proyecto — NO cambiarlos:
- `petshop-api` → puerto **5001**
- `bebidas-api` → puerto **5002**
- `aducma-api` → puerto **5003**
- `chatbot-portal` → puerto **5004**
- `dalirium-backend` → puerto **3001**

Para deployar al servidor siempre:
```bash
cd /var/www/[proyecto]/backend
git pull origin main
npm install
pm2 restart [nombre-api]
```

⚠️ El `git reset --hard` PISA el `.env`. Nunca usarlo sin verificar que el .env esté respaldado.

## Principios de diseño

### Filosofía de diseño — MUY IMPORTANTE
Paola NO quiere páginas estáticas ni diseños genéricos. Cada proyecto debe ser:

- **Vanguardista y futurista** — usar las últimas tendencias de diseño web: glassmorphism, neomorfismo, gradientes de malla, partículas, efectos de luz
- **Dinámico y con movimiento** — animaciones que impacten desde el primer segundo. Usar Framer Motion, GSAP o CSS animations avanzadas
- **Memorable e impactante** — que el usuario diga "wow" al entrar. Un elemento visual que sea imposible de olvidar
- **Moderno de verdad** — no Inter en blanco, no cards genéricas, no layouts de template. Diseño con personalidad y punto de vista estético claro

### Recursos de React a usar siempre
- **Framer Motion** — animaciones de entrada, exit, scroll-triggered, layout animations
- **React Spring** o **GSAP** — para animaciones físicas y complejas
- **Three.js / React Three Fiber** — cuando el proyecto lo amerite (globos, partículas, 3D)
- **Lottie React** — para animaciones ilustradas
- **React Intersection Observer** — fade-in y efectos al hacer scroll
- **Parallax** — capas con velocidades diferentes para profundidad

### Patrones visuales que Paola usa
- Hero sections con video, partículas o animación 3D de fondo
- Texto animado: typewriter, split text, morphing
- Carruseles y sliders con transiciones fluidas (Swiper, Embla)
- Cards con hover effects: flip, glow, scale con sombra dinámica
- Gradientes animados y fondos con movimiento
- Scroll suave con efectos parallax
- Loaders creativos antes de mostrar el contenido
- Micro-interacciones en todos los elementos interactivos

### Estética general
- **Mobile-first siempre** — diseñar primero para móvil, luego adaptar a desktop
- **Animaciones suaves pero impactantes** — transiciones con curvas de easing personalizadas, no lineales
- **Personalidad de marca** — cada proyecto tiene identidad propia, nunca genérico
- **Jerarquía visual clara** — el CTA principal siempre visible, contraste alto
- **Imágenes de calidad** — lazy loading, formato WebP, skeleton loaders mientras cargan

### Componentes que van en TODOS los proyectos públicos
1. **WhatsAppButton flotante** — abajo a la derecha, número desde variable de entorno `VITE_WHATSAPP_NUMBER`
2. **Navbar** — logo + navegación + búsqueda + carrito (si aplica)
3. **Footer** — info de contacto + redes + links legales
4. **CookieBanner** — primera visita, guardar decisión en localStorage
5. **PromoModal** — imagen configurable, 1 vez por sesión (sessionStorage)

### Paletas de color por proyecto
- **Vagabundo Pet Shop**: rojo `#C41E3A` + blanco + gris oscuro. Energético, confiable.
- **laEugenia**: tonos cálidos, marrones y cremas. Artesanal, cercano.
- **Dalirium**: negro + dorado + bordó. Artístico, misterioso, surreal.
- **TravelConnect**: azules + verdes. Moderno, aventurero.
- **ADUCMA**: azul institucional + blanco. Profesional, serio.
- **Con Código Art**: negro + blanco + acento de color. Minimalista, creativo.

## Patrones de código

### Variables de entorno
- Frontend (Vercel): prefijo `VITE_`
- Backend (DO): sin prefijo, acceder con `process.env.NOMBRE`
- Números de WhatsApp: `VITE_WHATSAPP_NUMBER` — nunca hardcodeados
- MongoDB: `MONGO_URI`
- Cloudinary: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

### Estructura de rutas API estándar
```
GET    /api/products          → listar productos
POST   /api/products          → crear producto (protegido)
PUT    /api/product/:id       → editar producto (protegido)
DELETE /api/product/:id       → eliminar producto (protegido)
GET    /api/categories        → listar categorías
GET    /api/config            → config de página
POST   /api/config            → guardar config (protegido)
POST   /api/upload            → subir imagen a Cloudinary
GET    /api/health            → verificar conexión MongoDB
```

### Panel admin
- Ruta siempre en `/admin/dashboard`
- Autenticación guardada en localStorage
- Secciones típicas: Productos, Categorías, Configuración de página
- Configuración editable: hero, ticker/barra de anuncios, número de WhatsApp, modal de publicidad

### Carrito de compras
- Guardado en `localStorage` con clave `[proyecto]Cart`
- Checkout via WhatsApp: armar mensaje con items + total + link `wa.me/NÚMERO?text=...`
- Usar Context API (`CartContext`) para estado global

### Turnera / sistema de turnos
- Validar fechas pasadas y fines de semana en el **backend** (no solo en frontend)
- Zona horaria Argentina: parsear fechas con `T12:00:00.000Z`
- Rate limiting en endpoints públicos: máx 10 req/IP/minuto con `express-rate-limit`
- Estados válidos del enum: `pendiente`, `confirmado`, `terminado`, `rechazado`, `cancelado`

## Seguridad

- CORS configurado con `ALLOWED_ORIGINS` desde `.env`
- Rate limiting en endpoints públicos
- Validación en backend (no confiar solo en el frontend)
- Helmet.js en todos los backends
- Sanitizar inputs antes de guardar en MongoDB
- Imágenes: validar tipo y tamaño antes de subir a Cloudinary

## Integración WhatsApp

- Botón flotante en todas las páginas públicas
- Número siempre desde variable de entorno
- Mensaje de checkout: incluir nombre del negocio, lista de productos con cantidades y precios, total
- En turnera: mensaje de confirmación con fecha, hora y servicio elegido

## Patrones de deploy

### Proyectos en Vercel (frontend solo O proyecto completo)
- Build: `npm run build`
- Variables de entorno configuradas en panel de Vercel
- Deploy automático al hacer push a `main`
- Algunos proyectos son 100% Vercel (frontend + serverless functions)
- Otros tienen frontend en Vercel + backend en Digital Ocean

### Backend en Digital Ocean
```bash
# Deploy estándar
cd /var/www/[proyecto]/backend
git pull origin main
npm install
pm2 restart [nombre-api]
pm2 save

# Verificar que está corriendo
pm2 logs [nombre-api] --lines 20
```

### ⚠️ Patrones a evitar
- NO hacer `git reset --hard` en el servidor sin respaldar el `.env` antes
- NO hardcodear números de teléfono, URLs o credenciales
- NO dejar `console.log` en producción
- NO usar el mismo puerto para dos proyectos distintos
- NO subir el `.env` a GitHub

## Notas de contexto

Paola es una desarrolladora full-stack argentina que trabaja de forma independiente bajo la marca **Con Código Art** (concodigoart.com). Gestiona múltiples proyectos de clientes en un servidor compartido de Digital Ocean. Valora:

- Código limpio y mantenible
- Que el cliente pueda gestionar el contenido sin tocar código
- Diseño impactante y creativo
- Soluciones prácticas y rápidas
- Que todo funcione bien en mobile

Cuando sugieras cambios, priorizá siempre: **experiencia de usuario → seguridad → mantenibilidad → features nuevas**.
