📋 PLAN DE TRABAJO:
FASE 1 - AQUÍ en claude.ai (AHORA):
✅ Te preparo documento maestro completo
✅ Trabajamos los primeros pasos del proyecto
✅ Avanzamos hasta que se acaben tus créditos de hoy
FASE 2 - En OpenRouter (después):
✅ Copias el documento maestro
✅ Pegas en OpenRouter
✅ Le dices "Continuemos desde [donde quedamos]"
✅ Seguimos trabajando sin interrupciones

🎯 EMPECEMOS - DOCUMENTO MAESTRO
Te voy a crear el documento completo dividido en secciones. Guárdalo todo en un archivo .txt o documento para tenerlo listo.

📄 PROYECTO: MENÚ DIGITAL PARA RESTAURANTES
CONTEXTO DEL PROYECTO
Cliente: 1 restaurante confirmado (primero de muchos)
Objetivo: Crear un menú digital accesible vía QR Code que los clientes escanean desde la mesa del restaurante.
Acceso:
Cliente escanea QR → Se abre página web en el celular
NO es una app para descargar
100% web responsive mobile-first
Modelo de negocio:
Venta one-time + mensualidad de mantenimiento
O suscripción mensual por restaurante
Arquitectura preparada para múltiples restaurantes

🏗️ ARQUITECTURA TÉCNICA
Stack tecnológico:
Frontend:
React 18 con Vite
React Router para navegación
Tailwind CSS para estilos
Axios para llamadas API
Responsive mobile-first
Backend:
Node.js con Express
MongoDB con Mongoose
JWT para autenticación
Cloudinary para gestión de imágenes
CORS, dotenv, bcrypt
Deployment:
Frontend: Vercel (gratis, CDN global)
Backend: Digital Ocean (puerto 3001)
Base de datos: MongoDB Atlas
Nginx: Reverse proxy en Digital Ocean

💾 MODELOS DE BASE DE DATOS (MongoDB)
Modelo: Restaurante
javascript
{
  _id: ObjectId,
  nombre: String (requerido),
  slug: String (único, para URL),
  logo: String (URL de Cloudinary),
  temaColores: {
    primario: String (hex color),
    secundario: String (hex color),
    fondo: String (hex color)
  },
  contacto: {
    email: String,
    telefono: String,
    direccion: String
  },
  activo: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
Modelo: Usuario (admin del restaurante)
javascript
{
  _id: ObjectId,
  restauranteId: ObjectId (ref: 'Restaurante'),
  nombre: String,
  email: String (único, requerido),
  password: String (hasheado con bcrypt),
  rol: String (default: 'admin'),
  activo: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
Modelo: Categoria
javascript
{
  _id: ObjectId,
  restauranteId: ObjectId (ref: 'Restaurante', requerido),
  nombre: String (requerido),
  icono: String (emoji o nombre de ícono),
  descripcion: String,
  orden: Number (para ordenar categorías),
  visible: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
Modelo: Plato
javascript
{
  _id: ObjectId,
  restauranteId: ObjectId (ref: 'Restaurante', requerido),
  categoriaId: ObjectId (ref: 'Categoria', requerido),
  nombre: String (requerido),
  descripcion: String,
  precio: Number (requerido),
  imagen: String (URL de Cloudinary),
  ingredientes: [String],
  alergenos: [String],
  estrellas: Number (1-5, default: 5),
  destacado: Boolean (default: false),
  disponible: Boolean (default: true),
  visible: Boolean (default: true),
  orden: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📁 ESTRUCTURA DE CARPETAS

### **Backend:**
```
menu-digital-backend/
├── node_modules/
├── config/
│   ├── db.js                 # Conexión MongoDB
│   └── cloudinary.js         # Config Cloudinary
├── middleware/
│   ├── auth.js               # Verificar JWT
│   └── upload.js             # Upload a Cloudinary
├── models/
│   ├── Restaurante.js
│   ├── Usuario.js
│   ├── Categoria.js
│   └── Plato.js
├── routes/
│   ├── auth.js               # Login, registro
│   ├── restaurantes.js
│   ├── categorias.js
│   └── platos.js
├── controllers/
│   ├── authController.js
│   ├── restauranteController.js
│   ├── categoriaController.js
│   └── platoController.js
├── .env
├── .gitignore
├── package.json
└── server.js                 # Punto de entrada
```

### **Frontend:**
```
menu-digital-frontend/
├── node_modules/
├── public/
│   └── qr-code.png
├── src/
│   ├── pages/
│   │   ├── Menu.jsx              # Vista pública del menú
│   │   └── admin/
│   │       ├── Login.jsx
│   │       ├── Dashboard.jsx
│   │       ├── Platos.jsx
│   │       ├── PlatoForm.jsx
│   │       ├── Categorias.jsx
│   │       └── Configuracion.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── CategoriaCard.jsx
│   │   ├── PlatoCard.jsx
│   │   ├── ModalPlato.jsx        # Modal estilo carrito
│   │   └── ProtectedRoute.jsx
│   ├── services/
│   │   └── api.js                # Axios config
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .gitignore
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## 🛣️ RUTAS DEL BACKEND (API)

### **Autenticación:**
```
POST   /api/auth/register      # Crear usuario admin
POST   /api/auth/login         # Login
GET    /api/auth/me            # Obtener usuario actual
```

### **Restaurantes:**
```
GET    /api/restaurantes/:slug           # Obtener por slug (público)
PUT    /api/restaurantes/:id             # Actualizar (privado)
PUT    /api/restaurantes/:id/tema        # Actualizar colores
POST   /api/restaurantes/:id/logo        # Subir logo
```

### **Categorías:**
```
GET    /api/categorias?restauranteId=    # Listar (público)
POST   /api/categorias                   # Crear (privado)
PUT    /api/categorias/:id               # Actualizar
DELETE /api/categorias/:id               # Eliminar
PUT    /api/categorias/reordenar         # Cambiar orden
```

### **Platos:**
```
GET    /api/platos?restauranteId=&categoriaId=  # Listar (público)
GET    /api/platos/:id                          # Obtener uno
POST   /api/platos                              # Crear (privado)
PUT    /api/platos/:id                          # Actualizar
DELETE /api/platos/:id                          # Eliminar
POST   /api/platos/:id/imagen                   # Subir imagen

⚛️ COMPONENTES DE REACT
Páginas públicas:
Menu.jsx: Vista principal con categorías y platos
Navbar con logo del restaurante
Grid de categorías con íconos
Modal para mostrar platos de cada categoría
Admin (protegidas):
Login.jsx: Formulario de login
Dashboard.jsx: Resumen de platos y categorías
Platos.jsx: Lista de todos los platos
PlatoForm.jsx: Crear/editar plato
Categorias.jsx: Gestión de categorías
Configuracion.jsx: Logo y colores
Componentes reutilizables:
CategoriaCard: Tarjeta de categoría con ícono
PlatoCard: Tarjeta de plato con imagen, precio, estrellas
ModalPlato: Modal estilo carrito para mostrar platos
Navbar: Barra de navegación con logo
ProtectedRoute: HOC para rutas privadas

📅 PLAN DE DESARROLLO (3 SEMANAS)
SEMANA 1: Backend + Admin básico
Días 1-2:
✅ Setup proyecto backend (Express, MongoDB)
✅ Modelos de MongoDB (Restaurante, Usuario, Categoria, Plato)
✅ Conexión a MongoDB Atlas
✅ Configuración de Cloudinary
Días 3-4:
✅ Rutas y controladores de autenticación
✅ Middleware de auth (JWT)
✅ CRUD de categorías
✅ CRUD de platos
Días 5-7:
✅ Setup proyecto frontend (React + Vite)
✅ Login admin
✅ Dashboard básico
✅ Lista de platos
✅ Formulario crear/editar plato
SEMANA 2: Vista pública + Personalización
Días 1-3:
✅ Página pública del menú (Menu.jsx)
✅ Grid de categorías responsive
✅ Modal de platos estilo carrito
✅ PlatoCard con imagen, precio, estrellas
Días 4-5:
✅ Gestión de categorías en admin
✅ Configuración de colores personalizados
✅ Upload de logo
✅ Aplicar tema en tiempo real
Días 6-7:
✅ Refinamiento UI/UX
✅ Responsive mobile (testing en celular)
✅ Optimización de imágenes
SEMANA 3: Deploy + Testing + Entrega
Días 1-2:
✅ Testing completo de funcionalidades
✅ Ajustes de diseño con cliente
✅ Carga de contenido real (platos del restaurante)
Días 3-4:
✅ Deploy backend a Digital Ocean
✅ Configurar PM2
✅ Configurar Nginx
✅ Deploy frontend a Vercel
Días 5-6:
✅ Generar QR Code
✅ Imprimir QR para mesas
✅ Testing en restaurante real
✅ Ajustes finales
Día 7:
✅ Capacitación al cliente
✅ Manual de uso
✅ Entrega oficial

🔐 VARIABLES DE ENTORNO
Backend (.env):
bash
PORT=3001
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=tu_secreto_aqui_muy_seguro
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
Frontend (.env):
bash
VITE_API_URL=https://api.agenciatripnow.site/menu

📝 RESUMEN EJECUTIVO
Proyecto: Menú Digital para Restaurantes vía QR Code
Tech Stack: React + Node.js + MongoDB + Cloudinary
Estrategia: MVP mono-tenant con arquitectura multi-tenant (restaurantId en todos los modelos)
Timeline: 3 semanas
Cliente actual: 1 restaurante confirmado
Características principales:
Vista pública mobile-first con categorías y platos
Admin dashboard para gestionar contenido
Personalización (logo, colores)
Acceso vía QR Code
Sin instalación, 100% web
Despliegue:
Frontend: Vercel
Backend: Digital Ocean (puerto 3001)
Base de datos: MongoDB Atlas
Imágenes: url


📍 DEPLOYMENT (como tus otros proyectos):
Frontend:
Vercel (gratis)
- Como: dalirium.vercel.app
- O con dominio personalizado si quieres
- Deploy automático desde GitHub
Backend:
Digital Ocean - Servidor n8ntravel
- Puerto nuevo (por ejemplo: 3002 o 5004)
- PM2 para mantenerlo corriendo
- Nginx reverse proxy
Base de datos:
MongoDB Atlas
- Nueva base de datos: "menu_digital"
- Separada de tus otras apps

🗺️ Igual que tus proyectos actuales:
Proyecto
Frontend
Backend
Puerto
BD
El Danés
Vercel
Digital Ocean
5002
MongoDB Atlas
Dalirium
Vercel
Digital Ocean
3001
MongoDB Atlas
ADUCMA
Vercel
Digital Ocean
5003
MongoDB Atlas
Vagabundo
Vercel
Digital Ocean
5001
MongoDB Atlas
MENÚ DIGITAL
Vercel
Digital Ocean
3002 ó 5004
MongoDB Atlas


🔧 Configuración Nginx (nueva):
Cuando despleguemos, crearemos:
nginx
# /etc/nginx/sites-available/menu-api

server {
    listen 443 ssl http2;
    server_name api.agenciatripnow.site;
    
    # Menú Digital
    location /menu/ {
        proxy_pass http://localhost:3002/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    # Tus otras rutas existentes...
}
```

---

## 📦 Entonces el flujo completo:
```
Cliente escanea QR
    ↓
https://menu-restaurante.vercel.app (Frontend en Vercel)
    ↓
Llama a: https://api.agenciatripnow.site/menu/api/platos
    ↓
Nginx en Digital Ocean redirige a puerto 3002
    ↓
Backend Node.js en Digital Ocean (PM2)
    ↓
MongoDB Atlas (base de datos)

✅ Exacto como trabajas siempre:
Desarrollas local (frontend + backend en tu PC)
Subes frontend a Vercel (Git push)
Subes backend a Digital Ocean vía Git
PM2 lo mantiene corriendo
Nginx lo expone al mundo

—--------------------------------------------------------------------



ESTADO ACTUAL DEL PROYECTO:
Backend (funcionando):
Ubicación: C:\xamppNuevo\htdocs\menu-digital\backend
Puerto: 3002
Dependencias instaladas: Express, Mongoose, JWT, Cloudinary, etc.
Estado: ✅ Servidor corriendo
MongoDB: ⏸️ Temporalmente deshabilitado (falta configurar URI)
Frontend:
Ubicación: C:\xamppNuevo\htdocs\menu-digital\frontend
Estado: ⏸️ Pendiente (carpeta creada pero no iniciado)



ARCHIVOS IMPORTANTES CREADOS:
server.js (funcionando):
javascript
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB (COMENTADO TEMPORALMENTE)
// const connectDB = require('./config/db');
// connectDB();

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ 
    message: '🍽️ API Menú Digital funcionando',
    version: '1.0.0'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend funcionando correctamente'
  });
});

// Puerto
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});
.env (parcial):
bash
PORT=3002
NODE_ENV=development
MONGODB_URI=mongodb+srv://PENDIENTE
JWT_SECRET=menu_digital_secreto_super_seguro_2025


ESTADO ACTUAL DEL PROYECTO MENÚ DIGITAL: ✅ BACKEND COMPLETO Y FUNCIONANDO - Ubicación: C:\xamppNuevo\htdocs\menu-digital\backend - Puerto: 3002 - MongoDB: Conectado (menu_digital) - URL base: http://localhost:3002 ✅ ESTRUCTURA CREADA: - 4 Modelos: Restaurante, Usuario, Categoria, Plato - 4 Controllers: auth, restaurante, categoria, plato - 4 Rutas: /api/auth, /api/restaurantes, /api/categorias, /api/platos - Middleware de autenticación con JWT ✅ ENDPOINTS DISPONIBLES: - POST /api/auth/register → Crear usuario + restaurante - POST /api/auth/login → Login - GET /api/auth/me → Usuario actual - Y todos los CRUD de restaurante, categorías y platos ⏸️ PENDIENTE: - Frontend React (carpeta creada pero vacía) - Upload de imágenes a Cloudinary (middleware creado, falta implementar) - Probar todos los endpoints 


—---------------------------------------------------------------

# PROYECTO MENÚ DIGITAL - RESUMEN COMPLETO

## ESTADO ACTUAL
Backend 100% funcional. Usuario y restaurante creados exitosamente.

## UBICACIÓN
- Backend: C:\xamppNuevo\htdocs\menu-digital\backend
- Frontend: C:\xamppNuevo\htdocs\menu-digital\frontend (vacío)

## CREDENCIALES DE PRUEBA
Email: paola2@test.com
Password: 123456
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODdjNTY3YWM1NWM5ZmVlNDNkMmJjMSIsImlhdCI6MTc3MDUwNTU3NSwiZXhwIjoxNzczMDk3NTc1fQ.r85PzM2N91fdXleWuzVCLVwRyBmK2cKYVN-WX7z8UHs

## DATOS DEL RESTAURANTE CREADO
ID: 6987c567ac55c9fee43d2bbf
Nombre: Restaurante de Paola
Slug: restaurante-de-paola

## SERVIDOR
- Puerto: 3002
- URL: http://localhost:3002
- MongoDB: menu_digital en cluster0.beknfe6.mongodb.net

## ENDPOINTS DISPONIBLES

### Autenticación:
- POST /api/auth/register → Crear usuario + restaurante
- POST /api/auth/login → Login
- GET /api/auth/me → Usuario actual (requiere token)

### Restaurantes:
- GET /api/restaurantes/:slug → Ver restaurante (público)
- GET /api/restaurantes/admin/mi-restaurante → Mi restaurante (privado)
- PUT /api/restaurantes/:id → Actualizar
- PUT /api/restaurantes/:id/tema → Actualizar colores
- PUT /api/restaurantes/:id/horarios → Actualizar horarios

### Categorías:
- GET /api/categorias?restauranteId=xxx → Listar (público)
- POST /api/categorias → Crear (privado)
- PUT /api/categorias/:id → Actualizar
- DELETE /api/categorias/:id → Eliminar

### Platos:
- GET /api/platos?restauranteId=xxx → Listar (público)
- POST /api/platos → Crear (privado)
- PUT /api/platos/:id → Actualizar
- DELETE /api/platos/:id → Eliminar



## COMANDOS PARA ARRANCAR
```bash
# Backend
cd C:\xamppNuevo\htdocs\menu-digital\backend
npm run dev

# Frontend (cuando esté listo)
cd C:\xamppNuevo\htdocs\menu-digital\frontend
npm run dev
```

## ARCHIVOS IMPORTANTES
- .env → Configuración (MongoDB, JWT, Cloudinary)
- server.js → Punto de entrada
- models/ → Esquemas de MongoDB
- controllers/ → Lógica de negocio
- routes/ → Definición de endpoints
- middleware/auth.js → Protección de rutas

🎯 # 🍽️ Menú Digital para Restaurantes

Sistema completo de menú digital accesible vía QR Code para restaurantes. Los clientes escanean el código QR desde la mesa y acceden al menú completo en su celular, sin necesidad de instalar ninguna aplicación.

## 🎯 Características Principales

### ✨ Para Clientes
- 📱 Acceso inmediato vía QR Code
- 🎨 Menú visualmente atractivo con imágenes
- 🔍 Búsqueda por categorías
- ⚠️ Información de alérgenos
- 🌱 Identificación de platos vegetarianos/veganos
- 📊 Disponibilidad en tiempo real

### 👨‍💼 Para Restaurantes
- 📋 Importación rápida desde Excel
- 🎨 Personalización de colores y logo
- 📸 Imágenes desde URLs (sin almacenamiento)
- ⚡ Actualización instantánea de disponibilidad
- 📅 Gestión de horarios
- 📊 Dashboard admin completo

### 🔧 Para Administrador
- 🏢 Gestión multi-restaurante
- 👥 Control de usuarios
- 📊 Estadísticas globales
- 🔐 Roles y permisos

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT para autenticación
- Multer para archivos
- XLSX para importación de Excel

**Frontend (Pendiente):**
- React 18 + Vite
- React Router
- Tailwind CSS
- Axios

**Base de Datos:**
- MongoDB Atlas
- Cluster compartido con otros proyectos
- Base de datos: `menu_digital`

**Deployment:**
- Frontend: Vercel
- Backend: Digital Ocean (Puerto 3002)
- Nginx: Reverse proxy

---

## 📊 Modelos de Datos

### Restaurante
```javascript
{
  nombre: String,
  slug: String (único),
  logo: String (URL),
  tema: {
    colorPrimario: String,
    colorSecundario: String,
    colorFondo: String,
    colorTexto: String
  },
  contacto: {
    email, telefono, whatsapp,
    direccion: { calle, ciudad, provincia, pais }
  },
  horarios: { lunes, martes, ... domingo },
  configuracion: {
    moneda, idioma, aceptaTarjeta, ...
  },
  redesSociales: { instagram, facebook }
}
```

### Usuario (Admin)
```javascript
{
  restauranteId: ObjectId,
  nombre: String,
  email: String (único),
  password: String (hasheado),
  rol: String (admin/superadmin)
}
```

### Categoría
```javascript
{
  restauranteId: ObjectId,
  nombre: String,
  icono: String (emoji),
  orden: Number,
  visible: Boolean
}
```

### Plato
```javascript
{
  restauranteId: ObjectId,
  categoriaId: ObjectId,
  nombre: String,
  descripcion: String,
  precio: Number,
  imagen: String (URL),
  ingredientes: [String],
  alergenos: [String],
  etiquetas: {
    vegetariano, vegano, sinGluten, picante, nuevo
  },
  destacado: Boolean,
  disponible: Boolean
}
```

---

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js v18+
- MongoDB Atlas cuenta
- Git

### Setup Backend
```bash
# Clonar repositorio
git clone [URL_REPO]
cd menu-digital/backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Iniciar servidor de desarrollo
npm run dev
```

### Variables de Entorno (.env)
```bash
PORT=3002
NODE_ENV=development
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/menu_digital
JWT_SECRET=tu_secreto_super_seguro_aqui
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### Setup Frontend (Pendiente)
```bash
cd menu-digital/frontend
npm install
npm run dev
```

---

## 📋 API Endpoints

### Autenticación
```
POST   /api/auth/register    - Crear usuario y restaurante
POST   /api/auth/login       - Login
GET    /api/auth/me          - Usuario actual
PUT    /api/auth/password    - Cambiar contraseña
```

### Restaurantes
```
GET    /api/restaurantes/:slug                  - Ver por slug (público)
GET    /api/restaurantes/admin/mi-restaurante  - Mi restaurante
PUT    /api/restaurantes/:id                    - Actualizar
PUT    /api/restaurantes/:id/tema               - Actualizar colores
PUT    /api/restaurantes/:id/horarios           - Actualizar horarios
PUT    /api/restaurantes/:id/contacto           - Actualizar contacto
```

### Categorías
```
GET    /api/categorias                          - Listar (público)
GET    /api/categorias/admin/mis-categorias     - Mis categorías
POST   /api/categorias                          - Crear
PUT    /api/categorias/:id                      - Actualizar
DELETE /api/categorias/:id                      - Eliminar
PUT    /api/categorias/reordenar                - Cambiar orden
```

### Platos
```
GET    /api/platos                              - Listar (público)
GET    /api/platos/admin/mis-platos             - Mis platos
GET    /api/platos/destacados                   - Destacados
GET    /api/platos/:id                          - Ver uno
POST   /api/platos                              - Crear
PUT    /api/platos/:id                          - Actualizar
PUT    /api/platos/:id/disponibilidad           - Toggle disponibilidad
PUT    /api/platos/:id/destacado                - Toggle destacado
DELETE /api/platos/:id                          - Eliminar
```

### Importación (Excel)
```
POST   /api/import/menu                         - Importar desde Excel
GET    /api/import/plantilla                    - Descargar plantilla
```

---

## 📥 Importación de Menú desde Excel

### Formato del Archivo

| categoria | nombre | descripcion | precio | ingredientes | alergenos | imagen_url | vegetariano | vegano |
|-----------|--------|-------------|--------|--------------|-----------|------------|-------------|--------|
| Entradas | Empanadas | Empanadas caseras | 1200 | carne,cebolla | gluten | https://... | no | no |

### Alérgenos Válidos
```
gluten, lacteos, huevo, pescado, mariscos, frutos_secos,
soja, apio, mostaza, sesamo, sulfitos, lupino, moluscos, cacahuetes
```

### Uso

1. Descargar plantilla: `GET /api/import/plantilla`
2. Llenar con datos del menú
3. Importar: `POST /api/import/menu` (FormData con archivo)

---

## 🧪 Testing

### Tests Disponibles
```bash
# Probar modelos
node test-models.js

# Probar autenticación
node test-api.js

# Descargar plantilla Excel
node test-plantilla.js

# Importar menú
node test-import.js

# Ver platos creados
node test-ver-platos.js
```

---

## 🎨 Imágenes

Las imágenes se manejan mediante **URLs externas** para simplificar el MVP:

- ✅ Sin necesidad de almacenamiento
- ✅ Sin costos adicionales
- ✅ Fácil de actualizar
- ✅ Perfecto para producción

**Fuentes recomendadas:**
- [Unsplash](https://unsplash.com/s/photos/food)
- [Pexels](https://www.pexels.com/search/food/)

---

## 📱 Flujo de Usuario

### Cliente (Vista Pública)
1. Escanea QR Code en la mesa
2. Se abre menú en navegador móvil
3. Navega por categorías
4. Ve detalles de platos (foto, precio, ingredientes, alérgenos)

### Admin Restaurante
1. Login en dashboard
2. Opción A: Importar menú completo desde Excel
3. Opción B: Agregar platos manualmente
4. Gestionar disponibilidad en tiempo real
5. Personalizar colores y logo

### Superadmin
1. Ver todos los restaurantes
2. Gestionar usuarios
3. Ver estadísticas globales

---

## 🚀 Deploy a Producción

### Backend (Digital Ocean)
```bash
# Conectar al servidor
ssh root@travel-n8n

# Clonar repositorio
cd /var/www
git clone [URL_REPO] menu-digital
cd menu-digital/backend

# Instalar dependencias
npm install --production

# Configurar variables de entorno
nano .env

# Iniciar con PM2
pm2 start server.js --name menu-digital-api
pm2 save
```

### Nginx Configuration
```nginx
location /menu/ {
    proxy_pass http://localhost:3002/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

### Frontend (Vercel)
```bash
# Conectar repositorio GitHub a Vercel
# Build Command: npm run build
# Output Directory: dist
# Environment Variables: VITE_API_URL
```

---

## 📊 Estado del Proyecto

### ✅ Completado
- [x] Backend completo
- [x] Modelos de datos
- [x] Autenticación JWT
- [x] CRUD completo
- [x] Importación desde Excel
- [x] Soporte para imágenes URL
- [x] Testing básico

### ⏳ En Desarrollo
- [ ] Frontend React
- [ ] Dashboard Admin Restaurante
- [ ] Dashboard Superadmin
- [ ] Deploy a producción

### 📋 Roadmap Futuro
- [ ] Upload de imágenes a Cloudinary
- [ ] Exportar menú a PDF
- [ ] Sistema de QR codes dinámicos
- [ ] Estadísticas de visualizaciones
- [ ] Multi-idioma
- [ ] Integración con sistemas de pedidos

---

## 🤝 Contribuir

Este es un proyecto privado en desarrollo.

---

## 📄 Licencia

Propietario: Paola Novick
Uso: Privado

---

## 📞 Contacto

Paola Novick - Desarrolladora Full Stack