# 🍽️ Menú Digital para Restaurantes

Sistema completo de menú digital accesible vía QR Code. Los clientes escanean el código desde la mesa y acceden al menú en su celular, sin instalar apps.

![Backend](https://img.shields.io/badge/Backend-100%25-green)
![Frontend](https://img.shields.io/badge/Frontend-100%25-green)
![Admin](https://img.shields.io/badge/Admin-100%25-green)
![Superadmin](https://img.shields.io/badge/Superadmin-100%25-green)

---

## 🎯 Características

### Para Clientes
- 📱 Acceso inmediato vía QR Code
- 🎨 Menú visual con fotos HD
- 🔍 Navegación por categorías
- ⚠️ Información de alérgenos
- 🌱 Etiquetas: vegetariano, vegano, sin gluten
- 📊 Disponibilidad en tiempo real

### Para Restaurantes (Admin)
- 📋 Importación desde Excel
- 🎨 Personalización de colores y logo
- ⚡ Actualización instantánea
- 📅 Gestión de horarios
- 🚚 Toggle de delivery on/off
- 📢 Sistema de anuncios

### Para Superadmin
- 🏢 Gestión multi-restaurante
- 👥 Control de usuarios
- 📊 Estadísticas globales

---

## 🏗️ Stack Tecnológico

| Backend | Frontend | Base de Datos | Deploy |
|---------|----------|---------------|--------|
| Node.js | React 18 | MongoDB Atlas | Vercel (front) |
| Express | Vite | Mongoose | Digital Ocean (back) |
| JWT | Tailwind CSS | | Nginx + PM2 |
| Multer | React Router | | |
| XLSX | Framer Motion | | |

---

## 🚀 Instalación Local

### Backend
```bash
cd backend
npm install
cp .env.example .env  # Configurar variables
npm run dev           # http://localhost:3002
```

### Frontend
```bash
cd frontend
npm install
npm run dev           # http://localhost:5173
```

---

## 🔐 Variables de Entorno

### Backend (.env)
```bash
PORT=3002
NODE_ENV=development
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/menu_digital
JWT_SECRET=tu_secreto_super_seguro_32_caracteres
```

### Frontend (.env)
```bash
# Desarrollo
VITE_API_URL=http://localhost:3002

# Producción
VITE_API_URL=https://api.agenciatripnow.site/menu/api
```

---

## 📋 API Endpoints

### Autenticación
| Método | Ruta | Acceso |
|--------|------|--------|
| POST | /api/auth/register | Público |
| POST | /api/auth/login | Público |
| GET | /api/auth/me | Privado |

### Restaurantes
| Método | Ruta | Acceso |
|--------|------|--------|
| GET | /api/restaurantes/:slug | Público |
| GET | /api/restaurantes/admin/mi-restaurante | Privado |
| PUT | /api/restaurantes/:id | Privado |
| PUT | /api/restaurantes/:id/tema | Privado |
| PUT | /api/restaurantes/:id/horarios | Privado |
| PUT | /api/restaurantes/:id/contacto | Privado |
| PUT | /api/restaurantes/:id/delivery-config | Privado |

### Categorías
| Método | Ruta | Acceso |
|--------|------|--------|
| GET | /api/categorias?restauranteId=xxx | Público |
| GET | /api/categorias/admin/mis-categorias | Privado |
| POST | /api/categorias | Privado |
| PUT | /api/categorias/:id | Privado |
| DELETE | /api/categorias/:id | Privado |

### Platos
| Método | Ruta | Acceso |
|--------|------|--------|
| GET | /api/platos?restauranteId=xxx | Público |
| GET | /api/platos/admin/mis-platos | Privado |
| GET | /api/platos/destacados?restauranteId=xxx | Público |
| POST | /api/platos | Privado |
| PUT | /api/platos/:id | Privado |
| PUT | /api/platos/:id/destacado | Privado |
| DELETE | /api/platos/:id | Privado |

### Anuncios
| Método | Ruta | Acceso |
|--------|------|--------|
| GET | /api/anuncios?restauranteId=xxx | Público |
| GET | /api/anuncios/admin/mis-anuncios | Privado |
| POST | /api/anuncios | Privado |
| PUT | /api/anuncios/:id | Privado |
| DELETE | /api/anuncios/:id | Privado |

### Importación Excel
| Método | Ruta | Acceso |
|--------|------|--------|
| GET | /api/import/plantilla | Privado |
| POST | /api/import/menu | Privado |

### Superadmin
| Método | Ruta | Acceso |
|--------|------|--------|
| GET | /api/superadmin/stats | Superadmin |
| GET | /api/superadmin/restaurantes | Superadmin |
| POST | /api/superadmin/restaurantes | Superadmin |
| PUT | /api/superadmin/restaurantes/:id | Superadmin |
| DELETE | /api/superadmin/restaurantes/:id | Superadmin |
| GET | /api/superadmin/usuarios | Superadmin |
| POST | /api/superadmin/usuarios | Superadmin |
| DELETE | /api/superadmin/usuarios/:id | Superadmin |

---

## 📥 Formato Excel para Importación

| Columna | Requerido | Ejemplo |
|---------|-----------|---------|
| categoria | ✅ | Entradas |
| nombre | ✅ | Empanadas |
| descripcion | ❌ | Caseras |
| precio | ✅ | 1200 |
| imagen_url | ❌ | https://... |
| ingredientes | ❌ | carne,cebolla |
| alergenos | ❌ | gluten,huevo |
| vegetariano | ❌ | si / no |
| vegano | ❌ | si / no |
| sin_gluten | ❌ | si / no |
| destacado | ❌ | si / no |

---

## 🗂️ Estructura del Proyecto
```
menu-digital/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   │   ├── admin/
    │   │   └── superadmin/
    │   ├── services/
    │   ├── App.jsx
    │   └── main.jsx
    └── .env
```

---

## 🚀 Deploy Producción

### URLs
| Servicio | URL |
|----------|-----|
| Frontend | https://menu-digital-roan.vercel.app |
| Backend | https://api.agenciatripnow.site/menu/api |
| Servidor | 167.172.31.249 |

### Comandos Deploy

**Frontend (automático con push):**
```bash
git add .
git commit -m "mensaje"
git push
```

**Backend:**
```bash
ssh root@167.172.31.249
cd /var/www/menu-digital-backend
git pull origin main
pm2 restart menu-digital-api
```

---

## 🔑 Credenciales de Prueba

| Rol | Email | Password |
|-----|-------|----------|
| Admin | pao@pao.com | (tu password) |
| Admin | paola2@test.com | 123456 |
| Superadmin | superadmin@menudigital.com | superadmin123 |

---

## 📄 Licencia

**Propietario:** Paola Novick  
**Uso:** Privado - Todos los derechos reservados

---

**Última actualización:** Febrero 2025  
**Versión:** 1.0.0