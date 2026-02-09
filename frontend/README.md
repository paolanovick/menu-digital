# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 🍽️ Menú Digital para Restaurantes

Sistema completo de menú digital accesible vía QR Code para restaurantes. Los clientes escanean el código QR desde la mesa y acceden al menú completo en su celular, sin necesidad de instalar ninguna aplicación.

![Estado del Proyecto](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow)
![Backend](https://img.shields.io/badge/Backend-Funcionando-green)
![Frontend](https://img.shields.io/badge/Frontend-En%20Desarrollo-orange)

---

## 🎯 Características Principales

### ✨ Para Clientes (Vista Pública)
- 📱 **Acceso inmediato vía QR Code** - Sin apps, solo escanear
- 🎨 **Menú visualmente atractivo** - Fotos HD de cada plato
- 🔍 **Navegación por categorías** - Iconos circulares intuitivos
- ⚠️ **Información de alérgenos** - Detalle completo de ingredientes
- 🌱 **Identificación clara** - Platos vegetarianos, veganos, sin gluten
- 📊 **Disponibilidad en tiempo real** - Platos agotados marcados
- 💰 **Precios actualizados** - Control total del restaurante

### 👨‍💼 Para Restaurantes (Dashboard Admin)
- 📋 **Importación rápida desde Excel** - Carga todo el menú en segundos
- 🎨 **Personalización completa** - Colores, logo, temas personalizados
- 📸 **Imágenes desde URLs** - Sin almacenamiento, sin costos
- ⚡ **Actualización instantánea** - Marca platos agotados al instante
- 📅 **Gestión de horarios** - Configura horarios de atención
- 📊 **Dashboard completo** - Gestión de platos, categorías
- 🔄 **Drag & Drop** - Reordena categorías y platos fácilmente

### 🔧 Para Administrador (Superadmin)
- 🏢 **Gestión multi-restaurante** - Un sistema, múltiples clientes
- 👥 **Control de usuarios** - Roles y permisos
- 📊 **Estadísticas globales** - Métricas de todos los restaurantes
- 🔐 **Seguridad completa** - JWT, roles, validaciones

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico Completo

**Backend:**
¡¡¡PERFECTO!!! 📄 Voy a crear el README.md COMPLETO Y ACTUALIZADO con todo lo que hemos hecho.

📄 README.md ACTUALIZADO
Crea o actualiza el archivo README.md en la raíz del proyecto (C:\xamppNuevo\htdocs\menu-digital\README.md):
markdown# 🍽️ Menú Digital para Restaurantes

Sistema completo de menú digital accesible vía QR Code para restaurantes. Los clientes escanean el código QR desde la mesa y acceden al menú completo en su celular, sin necesidad de instalar ninguna aplicación.

![Estado del Proyecto](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow)
![Backend](https://img.shields.io/badge/Backend-Funcionando-green)
![Frontend](https://img.shields.io/badge/Frontend-En%20Desarrollo-orange)

---

## 🎯 Características Principales

### ✨ Para Clientes (Vista Pública)
- 📱 **Acceso inmediato vía QR Code** - Sin apps, solo escanear
- 🎨 **Menú visualmente atractivo** - Fotos HD de cada plato
- 🔍 **Navegación por categorías** - Iconos circulares intuitivos
- ⚠️ **Información de alérgenos** - Detalle completo de ingredientes
- 🌱 **Identificación clara** - Platos vegetarianos, veganos, sin gluten
- 📊 **Disponibilidad en tiempo real** - Platos agotados marcados
- 💰 **Precios actualizados** - Control total del restaurante

### 👨‍💼 Para Restaurantes (Dashboard Admin)
- 📋 **Importación rápida desde Excel** - Carga todo el menú en segundos
- 🎨 **Personalización completa** - Colores, logo, temas personalizados
- 📸 **Imágenes desde URLs** - Sin almacenamiento, sin costos
- ⚡ **Actualización instantánea** - Marca platos agotados al instante
- 📅 **Gestión de horarios** - Configura horarios de atención
- 📊 **Dashboard completo** - Gestión de platos, categorías
- 🔄 **Drag & Drop** - Reordena categorías y platos fácilmente

### 🔧 Para Administrador (Superadmin)
- 🏢 **Gestión multi-restaurante** - Un sistema, múltiples clientes
- 👥 **Control de usuarios** - Roles y permisos
- 📊 **Estadísticas globales** - Métricas de todos los restaurantes
- 🔐 **Seguridad completa** - JWT, roles, validaciones

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico Completo

**Backend:**
```
- Node.js v18+
- Express.js
- MongoDB + Mongoose
- JWT (autenticación)
- Multer (archivos)
- XLSX (importación Excel)
- Bcrypt (passwords)
- CORS, dotenv
```

**Frontend:**
```
- React 18
- Vite (build tool)
- React Router v6
- Tailwind CSS v3
- Axios (HTTP client)
- Lucide React (iconos)
- Swiper (carousels)
- Framer Motion (animaciones)
```

**Base de Datos:**
```
- MongoDB Atlas
- Cluster: cluster0.beknfe6.mongodb.net
- Base de datos: menu_digital
- Multi-tenant ready
```

**Deployment:**
```
- Frontend: Vercel (CDN global, gratis)
- Backend: Digital Ocean (Puerto 3002)
- Nginx: Reverse proxy
- PM2: Process manager
```

---

## 📊 Modelos de Datos (MongoDB)

### 1. Restaurante
```javascript
{
  _id: ObjectId,
  nombre: String (requerido),
  slug: String (único, auto-generado),
  logo: String (URL),
  descripcion: String,
  
  tema: {
    colorPrimario: String,      // Personalizable desde dashboard
    colorSecundario: String,    // Personalizable desde dashboard
    colorFondo: String,         // Personalizable desde dashboard
    colorTexto: String          // Personalizable desde dashboard
  },
  
  contacto: {
    email: String,
    telefono: String,
    whatsapp: String,
    direccion: {
      calle: String,
      ciudad: String,
      provincia: String,
      codigoPostal: String,
      pais: String (default: 'Argentina')
    }
  },
  
  horarios: {
    lunes: { apertura: String, cierre: String },
    martes: { apertura: String, cierre: String },
    // ... resto de días
  },
  
  configuracion: {
    moneda: String (default: 'ARS'),
    idioma: String (default: 'es'),
    aceptaTarjeta: Boolean,
    aceptaEfectivo: Boolean,
    tieneDelivery: Boolean,
    metodoPago: [String]
  },
  
  redesSociales: {
    instagram: String,
    facebook: String
  },
  
  activo: Boolean (default: true),
  plan: String (default: 'básico'),
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Usuario (Admin del Restaurante)
```javascript
{
  _id: ObjectId,
  restauranteId: ObjectId (ref: 'Restaurante'),
  nombre: String,
  email: String (único, validado),
  password: String (hasheado con bcrypt),
  rol: String ('admin' | 'superadmin'),
  telefono: String,
  avatar: String (URL),
  activo: Boolean (default: true),
  ultimoAcceso: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Categoría
```javascript
{
  _id: ObjectId,
  restauranteId: ObjectId (ref: 'Restaurante'),
  nombre: String (requerido),
  descripcion: String,
  icono: String (emoji: 🍕🥗🍰),
  imagen: String (URL, opcional),
  color: String (hex color personalizado),
  orden: Number (para drag & drop),
  visible: Boolean (default: true),
  activo: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Plato
```javascript
{
  _id: ObjectId,
  restauranteId: ObjectId (ref: 'Restaurante'),
  categoriaId: ObjectId (ref: 'Categoria'),
  nombre: String (requerido),
  descripcion: String,
  precio: Number (requerido),
  imagen: String (URL externa),
  ingredientes: [String],
  
  alergenos: [String] (
    'gluten', 'lacteos', 'huevo', 'pescado', 
    'mariscos', 'frutos_secos', 'soja', etc.
  ),
  
  etiquetas: {
    vegetariano: Boolean,
    vegano: Boolean,
    sinGluten: Boolean,
    picante: Boolean,
    nuevo: Boolean
  },
  
  estrellas: Number (1-5),
  destacado: Boolean (default: false),
  disponible: Boolean (default: true),
  visible: Boolean (default: true),
  orden: Number,
  
  tiempoPreparacion: Number (minutos),
  porciones: Number,
  calorias: Number,
  
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Instalación y Configuración

### Prerrequisitos
```bash
- Node.js v18 o superior
- MongoDB Atlas cuenta
- Git
- npm o yarn
```

### 1. Clonar Repositorio
```bash
git clone [URL_DEL_REPO]
cd menu-digital
```

---

### 2. Setup Backend
```bash
# Ir a carpeta backend
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env

# Editar .env con tus credenciales
# (ver sección Variables de Entorno)

# Iniciar servidor de desarrollo
npm run dev
```

**El backend debería estar corriendo en:** `http://localhost:3002`

---

### 3. Setup Frontend
```bash
# Ir a carpeta frontend (desde la raíz)
cd ../frontend

# Instalar dependencias
npm install

# Crear archivo .env
# Copiar el contenido de abajo

# Iniciar servidor de desarrollo
npm run dev
```

**El frontend debería estar corriendo en:** `http://localhost:5173`

---

## 🔐 Variables de Entorno

### Backend (.env)
```bash
# Servidor
PORT=3002
NODE_ENV=development

# Base de datos
MONGODB_URI=mongodb+srv://usuario:password@cluster0.beknfe6.mongodb.net/menu_digital?retryWrites=true&w=majority

# JWT
JWT_SECRET=tu_secreto_super_seguro_minimo_32_caracteres_aqui

# Cloudinary (opcional - para futuro upload de imágenes)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### Frontend (.env)
```bash
# URL del backend
VITE_API_URL=http://localhost:3002
```

**Para producción:**
```bash
VITE_API_URL=https://api.agenciatripnow.site/menu
```

---

## 📁 Estructura del Proyecto
```
menu-digital/
├── backend/
│   ├── config/
│   │   ├── db.js                      # Conexión MongoDB
│   │   └── cloudinary.js              # Config Cloudinary
│   │
│   ├── controllers/
│   │   ├── authController.js          # Login, registro
│   │   ├── categoriaController.js     # CRUD categorías
│   │   ├── platoController.js         # CRUD platos
│   │   ├── restauranteController.js   # CRUD restaurantes
│   │   └── importController.js        # ⭐ Importación Excel
│   │
│   ├── middleware/
│   │   ├── auth.js                    # Verificar JWT
│   │   ├── upload.js                  # Upload Cloudinary
│   │   └── uploadFile.js              # ⭐ Upload Excel
│   │
│   ├── models/
│   │   ├── Restaurante.js
│   │   ├── Usuario.js
│   │   ├── Categoria.js
│   │   └── Plato.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── categorias.js
│   │   ├── platos.js
│   │   ├── restaurantes.js
│   │   └── import.js                  # ⭐ Rutas importación
│   │
│   ├── uploads/                       # ⭐ Archivos temporales
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── server.js                      # Punto de entrada
│   │
│   └── tests/                         # ⭐ Scripts de prueba
│       ├── test-api.js
│       ├── test-import.js
│       ├── test-plantilla.js
│       └── test-ver-platos.js
│
└── frontend/
    ├── public/
    │   └── qr-code.png
    │
    ├── src/
    │   ├── components/
    │   │   ├── CategoryIcon.jsx       # ✅ Icono categoría
    │   │   ├── Header.jsx              # ✅ Header
    │   │   ├── PlatoCard.jsx           # ⏸️ Card de plato
    │   │   ├── CarouselDestacados.jsx  # ⏸️ Carousel
    │   │   └── Footer.jsx              # ⏸️ Footer
    │   │
    │   ├── pages/
    │   │   ├── Home.jsx                # ✅ Grid categorías
    │   │   ├── CategoryPage.jsx        # ⏸️ Página categoría
    │   │   └── admin/                  # ⏸️ Dashboard admin
    │   │       ├── Login.jsx
    │   │       ├── Dashboard.jsx
    │   │       ├── Platos.jsx
    │   │       └── Configuracion.jsx
    │   │
    │   ├── services/
    │   │   └── api.js                  # ✅ Axios config
    │   │
    │   ├── context/
    │   │   └── ThemeContext.jsx        # ✅ Colores dinámicos
    │   │
    │   ├── App.jsx                     # ✅ Router
    │   ├── main.jsx
    │   └── index.css                   # ✅ Tailwind + CSS vars
    │
    ├── .env
    ├── .gitignore
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    └── vite.config.js
```

**Leyenda:**
- ✅ = Completado
- ⏸️ = Pendiente
- ⭐ = Feature destacada

---

## 📋 API Endpoints

### Base URL
```
Development: http://localhost:3002
Production:  https://api.agenciatripnow.site/menu
```

### Autenticación
```http
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
PUT    /api/auth/password
```

**Ejemplo - Registro:**
```json
POST /api/auth/register
{
  "nombre": "Admin Restaurante",
  "email": "admin@restaurante.com",
  "password": "password123",
  "restauranteNombre": "Mi Restaurante",
  "telefono": "1234567890"
}
```

---

### Restaurantes
```http
GET    /api/restaurantes/:slug                  # Público
GET    /api/restaurantes/admin/mi-restaurante   # Privado
PUT    /api/restaurantes/:id                    # Privado
PUT    /api/restaurantes/:id/tema               # Privado
PUT    /api/restaurantes/:id/horarios           # Privado
PUT    /api/restaurantes/:id/contacto           # Privado
```

---

### Categorías
```http
GET    /api/categorias?restauranteId=xxx        # Público
GET    /api/categorias/admin/mis-categorias     # Privado
GET    /api/categorias/:id                      # Privado
POST   /api/categorias                          # Privado
PUT    /api/categorias/:id                      # Privado
PUT    /api/categorias/reordenar                # Privado
DELETE /api/categorias/:id                      # Privado
```

---

### Platos
```http
GET    /api/platos?restauranteId=xxx&categoriaId=xxx  # Público
GET    /api/platos/admin/mis-platos                   # Privado
GET    /api/platos/destacados?restauranteId=xxx       # Público
GET    /api/platos/:id                                # Público
POST   /api/platos                                    # Privado
PUT    /api/platos/:id                                # Privado
PUT    /api/platos/:id/disponibilidad                 # Privado
PUT    /api/platos/:id/destacado                      # Privado
DELETE /api/platos/:id                                # Privado
```

---

### ⭐ Importación (Excel)
```http
POST   /api/import/menu                         # Privado
GET    /api/import/plantilla                    # Privado
```

**Ejemplo - Importar menú:**
```bash
POST /api/import/menu
Content-Type: multipart/form-data
Authorization: Bearer {token}

Body: FormData con archivo Excel
```

---

## 📥 Importación de Menú desde Excel

### Formato del Archivo

El Excel debe tener estas columnas:

| Columna | Tipo | Requerido | Ejemplo |
|---------|------|-----------|---------|
| `categoria` | String | ✅ | Entradas |
| `nombre` | String | ✅ | Empanadas de carne |
| `descripcion` | String | ❌ | Empanadas caseras |
| `precio` | Number | ✅ | 1200 |
| `ingredientes` | String | ❌ | carne,cebolla,aceitunas |
| `alergenos` | String | ❌ | gluten,huevo |
| `imagen_url` | String | ❌ | https://... |
| `vegetariano` | String | ❌ | si / no |
| `vegano` | String | ❌ | si / no |
| `sin_gluten` | String | ❌ | si / no |
| `picante` | String | ❌ | si / no |
| `destacado` | String | ❌ | si / no |

### Alérgenos Válidos
```
gluten, lacteos, huevo, pescado, mariscos, frutos_secos,
soja, apio, mostaza, sesamo, sulfitos, lupino, moluscos, cacahuetes
```

**Importante:**
- Sin acentos: ❌ `lácteos` → ✅ `lacteos`
- Singular: ❌ `huevos` → ✅ `huevo`
- Separados por comas: `gluten,lacteos,huevo`

### Uso del Sistema de Importación

**1. Descargar plantilla:**
```bash
GET /api/import/plantilla
```

**2. Llenar con datos del menú**

**3. Importar:**
```bash
POST /api/import/menu
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Importación completada",
  "data": {
    "categoriasCreadas": 3,
    "platosCreados": 15,
    "errores": []
  }
}
```

---

## 🖼️ Gestión de Imágenes

### Sistema Actual: URLs Externas

Las imágenes se manejan mediante **URLs externas** (no se suben archivos):

**Ventajas:**
- ✅ Sin costos de almacenamiento
- ✅ Sin límites de espacio
- ✅ Actualización instantánea
- ✅ CDN global automático
- ✅ Perfecto para MVP

**Fuentes Recomendadas:**
- [Unsplash](https://unsplash.com/s/photos/food) - Gratis, sin atribución
- [Pexels](https://www.pexels.com/search/food/) - Gratis
- Google Images - Verificar derechos

**Cómo obtener URL:**
1. Buscar imagen en Unsplash
2. Click derecho → "Copy Image Address"
3. Pegar URL en Excel o dashboard

---

## 🎨 Personalización de Colores

### Colores Dinámicos por Restaurante

Cada restaurante puede configurar sus propios colores desde el dashboard:
```javascript
// El restaurante configura:
tema: {
  colorPrimario: '#a83132',    // Botones, precios, acentos
  colorSecundario: '#777f82',  // Textos, bordes
  colorFondo: '#f7f5f2',       // Fondo general
  colorTexto: '#3d4245'        // Texto principal
}

// El frontend los aplica automáticamente con CSS variables:
:root {
  --color-primary: #a83132;
  --color-secondary: #777f82;
  --color-bg: #f7f5f2;
  --color-text: #3d4245;
}
```

### Paleta por Defecto

Si el restaurante no configura colores, se usan estos:
```css
Primario:    #a83132  (Rojo vino)
Secundario:  #777f82  (Gris)
Fondo:       #f7f5f2  (Crema)
Texto:       #3d4245  (Gris oscuro)
```

---

## 🧪 Testing y Desarrollo

### Scripts de Prueba Disponibles

**Backend:**
```bash
# Probar modelos
node test-models.js

# Probar autenticación
node test-api.js

# Descargar plantilla Excel
node test-plantilla.js

# Importar menú desde Excel
node test-import.js

# Ver platos en la base de datos
node test-ver-platos.js
```

---

## 🚦 Estado del Proyecto

### ✅ Completado (Backend)

- [x] Setup proyecto con Express
- [x] Conexión MongoDB Atlas
- [x] Modelos de datos (4 modelos)
- [x] Autenticación JWT
- [x] CRUD completo de restaurantes
- [x] CRUD completo de categorías
- [x] CRUD completo de platos
- [x] Sistema de importación Excel ⭐
- [x] Soporte imágenes URL ⭐
- [x] Middleware de autenticación
- [x] Validaciones y seguridad
- [x] Testing básico

### ✅ Completado (Frontend)

- [x] Setup React + Vite
- [x] Configuración Tailwind CSS
- [x] Router con React Router
- [x] Home page con grid de categorías ⭐
- [x] Header con logo y contacto ⭐
- [x] ThemeContext para colores dinámicos ⭐
- [x] Integración con API backend ⭐
- [x] Responsive mobile-first ⭐

### ⏳ En Desarrollo

- [ ] Página de categoría (carousel + cards)
- [ ] Card de plato estilo ecommerce
- [ ] Modal de detalle de plato
- [ ] Dashboard Admin Restaurante
- [ ] Dashboard Superadmin

### 📋 Roadmap Futuro

- [ ] Upload de imágenes a Cloudinary
- [ ] Exportar menú a PDF
- [ ] Sistema de QR codes dinámicos
- [ ] Estadísticas de visualizaciones
- [ ] Multi-idioma (ES/EN)
- [ ] Integración con sistemas de pedidos
- [ ] App móvil nativa
- [ ] Sistema de reviews/opiniones

---

## 🚀 Deploy a Producción

### Backend (Digital Ocean)
```bash
# Conectar al servidor
ssh root@167.172.31.249

# Clonar repositorio
cd /var/www
git clone [URL_REPO] menu-digital
cd menu-digital/backend

# Instalar dependencias
npm install --production

# Configurar .env
nano .env
# Pegar variables de producción

# Iniciar con PM2
pm2 start server.js --name menu-digital-api
pm2 save
pm2 startup
```

### Nginx Configuration
```nginx
# /etc/nginx/sites-available/menu-api

location /menu/ {
    proxy_pass http://localhost:3002/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_cache_bypass $http_upgrade;
}
```

### Frontend (Vercel)
```bash
# Conectar repositorio GitHub a Vercel
# Build Command: npm run build
# Output Directory: dist
# Root Directory: frontend

# Environment Variables en Vercel:
VITE_API_URL=https://api.agenciatripnow.site/menu
```

---

## 📊 Datos de Prueba

### Usuario Admin
```
Email: paola2@test.com
Password: 123456
```

### Restaurante
```
Nombre: Restaurante de Paola
Slug: restaurante-de-paola
ID: 6987c567ac55c9fee43d2bbf
```

### URLs de Prueba

**Backend:**
```
http://localhost:3002
http://localhost:3002/api/health
```

**Frontend:**
```
http://localhost:5173/restaurante-de-paola
```

**Producción (futuro):**
```
Backend:  https://api.agenciatripnow.site/menu
Frontend: https://menu-restaurante.vercel.app
```

---

## 🛠️ Comandos Útiles

### Backend
```bash
# Desarrollo
npm run dev

# Producción
npm start

# Pruebas
node test-api.js
node test-import.js
```

### Frontend
```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linter
npm run lint
```

---

## 📝 Notas Técnicas

### Multi-Tenant Preparado

Aunque el sistema está diseñado para un solo restaurante inicialmente, **toda la arquitectura está preparada para multi-tenant**:

- ✅ Todos los modelos incluyen `restauranteId`
- ✅ Queries filtran por restaurante
- ✅ Validaciones por restaurante
- ✅ Sin refactoring necesario para crecer

### MongoDB Atlas
```
Cluster: cluster0.beknfe6.mongodb.net
Bases de datos en el mismo cluster:
  ├── dalirium        → Puerto 3001
  ├── menu_digital    → Puerto 3002 ⭐
  ├── bebidas         → Puerto 5002
  ├── aducma          → Puerto 5003
  └── petshop         → Puerto 5001
```

Cada proyecto tiene su propia base de datos, pero comparten cluster.

### Seguridad

- ✅ Passwords hasheados con bcrypt (salt 10)
- ✅ JWT con expiración de 30 días
- ✅ Validación de permisos en todas las rutas privadas
- ✅ CORS configurado
- ✅ Validaciones de Mongoose
- ✅ Sanitización de inputs

---

## 🤝 Contribuir

Este es un proyecto privado en desarrollo.

---

## 📄 Licencia

**Propietario:** Paola Novick  
**Uso:** Privado - Todos los derechos reservados

---

## 📞 Contacto

**Desarrolladora:** Paola Novick  
**Stack:** Full Stack Developer (React + Node.js + MongoDB)  
**Especialización:** Menús digitales, E-commerce, APIs REST

---

## 🎯 Próximos Pasos Inmediatos

1. ✅ Backend funcionando
2. ✅ Frontend con grid de categorías
3. ⏭️ **Página de categoría con carousel y cards**
4. ⏭️ Dashboard admin restaurante
5. ⏭️ Dashboard superadmin
6. ⏭️ Deploy a producción

---

**Última actualización:** Febrero 2026  
**Versión:** 0.5.0 (MVP en desarrollo)

✅ Backend 100% funcional
✅ Frontend público funcionando:
   - Home con grid de categorías
   - Página de categoría con carousel + cards
   - Responsive mobile-first
   - Colores dinámicos
   - Todo conectado a la API

   Dashboard Admin 100% COMPLETO con:

✅ Dashboard home con estadísticas
✅ Gestión de platos (crear, editar, eliminar, toggle)
✅ Gestión de categorías
✅ Importar desde Excel
✅ Configuración (colores, logo, contacto, horarios)
✅ ESTADO ACTUAL DEL PROYECTO:
Backend (100% Completo):

✅ Modelos: Restaurante, Usuario, Categoria, Plato, Anuncio
✅ Controllers completos
✅ Autenticación JWT
✅ Importación Excel
✅ CRUD completo de todo

Frontend Público (100% Completo):

✅ Home con grid de categorías
✅ CategoryPage con carousel destacados
✅ AnunciosTicker con Framer Motion
✅ Cards de platos estilo ecommerce
✅ Responsive mobile-first

Dashboard Admin Restaurante (100% Completo):

✅ Login
✅ Dashboard home
✅ Platos (pestañas estilo El Danés)
✅ Categorías
✅ Anuncios
✅ Importar Excel
✅ Configuración (colores, logo, contacto, horarios)
 RESUMEN COMPLETO DEL PROYECTO:
🎯 BACKEND (100% Completo)

✅ 5 Modelos: Restaurante, Usuario, Categoria, Plato, Anuncio
✅ Controllers completos con validaciones
✅ Autenticación JWT con roles (admin, superadmin)
✅ Importación Excel funcional
✅ CRUD completo de todo
✅ Middleware de autorización

🌐 FRONTEND PÚBLICO (100% Completo)

✅ Home con grid de categorías
✅ CategoryPage con carousel de destacados
✅ AnunciosTicker con Framer Motion
✅ Cards de platos estilo ecommerce
✅ Sistema de temas dinámicos
✅ Responsive mobile-first

👨‍💼 DASHBOARD ADMIN RESTAURANTE (100% Completo)

✅ Login con redirección por rol
✅ Dashboard home con estadísticas
✅ Platos (pestañas estilo El Danés, stock, destacados)
✅ Categorías con modal
✅ Anuncios con ticker infinito
✅ Importar menú desde Excel
✅ Configuración (colores, logo, contacto, horarios)

🔧 DASHBOARD SUPERADMIN (100% Completo)

✅ Login separado
✅ Dashboard global con estadísticas
✅ Lista de todos los restaurantes
✅ Lista de todos los usuarios
✅ Eliminar restaurantes y usuarios
✅ Ver menús públicos

🗂️ CREDENCIALES IMPORTANTES:
Admin Restaurante:

Email: paola2@test.com
Password: 123456

Superadmin:

Email: superadmin@menudigital.com
Password: superadmin123

URLs:

Backend: http://localhost:3002
Frontend: http://localhost:5173
Admin: http://localhost:5173/admin/login
Superadmin: http://localhost:5173/admin/login (mismo login)

¡¡¡EXCELENTE!!! 🎉 El proyecto está CASI COMPLETO. Déjame hacer un resumen:

✅ LO QUE FUNCIONA 100%:
Backend:

✅ API REST completa
✅ MongoDB conectado
✅ Autenticación JWT con roles
✅ CRUD de: Restaurantes, Usuarios, Categorías, Platos, Anuncios
✅ Importación Excel
✅ Middleware de autorización

Frontend Público:

✅ Home con grid de categorías
✅ CategoryPage con carousel de destacados
✅ AnunciosTicker con Framer Motion
✅ Cards de platos responsive
✅ Temas dinámicos por restaurante

Dashboard Admin Restaurante:

✅ Login
✅ Dashboard con estadísticas
✅ Platos (pestañas, stock, destacados)
✅ Categorías
✅ Anuncios
✅ Importar Excel
✅ Configuración (colores, logo, contacto)

Dashboard Superadmin:

✅ Login
✅ Dashboard global
✅ Crear/Editar/Eliminar Restaurantes
✅ Crear/Eliminar Usuarios
✅ Ver todos los restaurantes y usuarios
LO QUE HICIMOS (Paso a Paso):
1️⃣ MongoDB Atlas (en el navegador)
✅ Verificaste que existe la base de datos menu_digital
✅ Verificaste que el usuario paolanovick_db_user tiene acceso
2️⃣ Archivo .env (en el servidor)
✅ Configuraste la conexión a MongoDB
✅ Configuraste el puerto 3002
✅ Pusiste las variables de entorno
3️⃣ Nginx (proxy inverso)
✅ Agregaste la ruta /menu/ que redirige al backend
✅ Recargaste Nginx
4️⃣ PM2 (gestor de procesos)
✅ Iniciaste el backend como menu-digital-api
✅ Ahora está corriendo en el puerto 3002
🌐 CÓMO FUNCIONA TODO:

Internet
    ↓
https://api.agenciatripnow.site/menu/
    ↓
Nginx (puerto 443) ← Certificado SSL
    ↓
Redirige a → http://localhost:3002/
    ↓
PM2 ejecuta → server.js (menu-digital-api)
    ↓
Backend Node.js/Express
    ↓
MongoDB Atlas (menu_digital)
✅ Backend instalado: /var/www/menu-digital-backend/
✅ MongoDB conectado: menu_digital en cluster0.beknfe6.mongodb.net
✅ Puerto: 3002
✅ PM2: menu-digital-api (autostart activado)
✅ Nginx configurado: /menu/ → localhost:3002
✅ SSL: Usa el certificado de api.agenciatripnow.site

🌐 URL API: https://api.agenciatripnow.site/menu/