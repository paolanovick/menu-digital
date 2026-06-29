# 📘 Manual de Uso — Menú Digital

Bienvenido. Esta guía te enseña paso a paso cómo administrar tu restaurante en la plataforma. Está pensada para que cualquier persona, sin conocimientos técnicos, pueda configurar y gestionar el menú, los pedidos, las mesas y los mozos.

---

## 📑 Índice

1. [Conceptos básicos](#1-conceptos-básicos)
2. [Cómo entrar al panel de administración](#2-cómo-entrar-al-panel-de-administración)
3. [Configuración inicial del restaurante](#3-configuración-inicial-del-restaurante)
4. [Crear y gestionar Categorías](#4-crear-y-gestionar-categorías)
5. [Cargar Productos (Platos)](#5-cargar-productos-platos)
6. [Importar el menú desde Excel](#6-importar-el-menú-desde-excel)
7. [Crear Anuncios y Promociones](#7-crear-anuncios-y-promociones)
8. [Activar y configurar Delivery](#8-activar-y-configurar-delivery)
9. [Activar y configurar el Sistema de Mozos](#9-activar-y-configurar-el-sistema-de-mozos)
10. [Cargar Mesas](#10-cargar-mesas)
11. [Cargar Mozos](#11-cargar-mozos)
12. [Gestionar Pedidos](#12-gestionar-pedidos)
13. [Cómo lo usa el cliente final (Menú Digital)](#13-cómo-lo-usa-el-cliente-final-menú-digital)
14. [Cómo lo usa el cliente final (Delivery)](#14-cómo-lo-usa-el-cliente-final-delivery)
15. [Cómo lo usa el Mozo (Salón)](#15-cómo-lo-usa-el-mozo-salón)
16. [Consejos y preguntas frecuentes](#16-consejos-y-preguntas-frecuentes)

---

## 1. Conceptos básicos

Tu restaurante tiene **dos modos de uso** que pueden funcionar al mismo tiempo:

- **Menú Digital con Delivery** → los clientes ven el menú desde su celular (escaneando un QR o entrando a un link) y pueden hacer pedidos a domicilio que llegan por WhatsApp.
- **Sistema de Mozos** → los mozos del salón usan sus celulares para tomar pedidos por mesa, controlar el estado de las mesas (libre / ocupada) y enviar los pedidos a cocina.

Cada restaurante tiene:
- Un **link público** del estilo `tudominio.com/tu-restaurante` para los clientes.
- Un **panel de administración** en `tudominio.com/admin` solo para vos.
- Una **interfaz de mozos** en `tudominio.com/mozo/tu-restaurante` solo para tu equipo.

---

## 2. Cómo entrar al panel de administración

1. Abrí tu navegador y entrá a `https://tudominio.com/admin/login`.
2. Ingresá tu **email** y **contraseña**.
3. Hacé clic en **Ingresar**.

Vas a entrar al **Dashboard**, donde verás:
- Cantidad total de platos cargados.
- Cantidad de categorías.
- Platos destacados.
- Platos agotados.
- Accesos rápidos para agregar plato, importar menú o ir a configuración.

> 💡 Del lado izquierdo (o pulsando el ☰ en celular) tenés el menú con todas las secciones: **Dashboard, Platos, Categorías, Anuncios, Pedidos, Mesas, Mozos, Importar, Configuración**.

---

## 3. Configuración inicial del restaurante

Antes de cargar productos, configurá los datos básicos del restaurante. Andá a **Configuración** (menú lateral). Vas a ver 6 pestañas:

### 3.1 Info Básica
- **Nombre del Restaurante**: aparece en el menú público.
- **Descripción**: breve texto que el cliente verá debajo del logo.
- Hacé clic en **Guardar Cambios**.

### 3.2 Tema y Logo
Personalizá la apariencia de tu menú:
- **URL del Logo**: pegá el link de la imagen de tu logo (lo subís a un servicio como imgbb.com o Cloudinary y copiás el enlace).
- **Tipografía**: elegí entre 8 fuentes (Playfair, Montserrat, Lora, Poppins, etc.).
- **Color Primario**: color principal (botones, precios). Por defecto es bordó.
- **Color Secundario**: color de acentos.
- **Color de Fondo**: fondo del menú.
- **Color de Texto**: texto principal.

Vas viendo una **Vista Previa** abajo en tiempo real. Cuando esté como querés, **Guardar Cambios**.

### 3.3 Contacto
- **Email**, **Teléfono**, **WhatsApp** (con código de país, ej: `5491123456789`).
- **Dirección** completa (calle, ciudad, provincia, código postal).
- **Redes sociales**: Instagram y Facebook (solo el usuario, sin @).

> ⚠️ El WhatsApp es **crítico**: es a donde van a llegar los pedidos. Asegurate de cargarlo bien.

### 3.4 Horarios
Cargá los horarios de apertura y cierre para cada día de la semana. Si un día está cerrado, dejalo vacío.

### 3.5 Servicios
- **Delivery**: activá o desactivá si querés que se muestre la opción de envíos en el menú público.

### 3.6 Pedidos
Acá configurás cómo funciona la toma de pedidos. Ver detalles en las secciones [Delivery](#8-activar-y-configurar-delivery) y [Mozos](#9-activar-y-configurar-el-sistema-de-mozos).

---

## 4. Crear y gestionar Categorías

Las categorías agrupan tus productos (Entradas, Pizzas, Bebidas, Postres, etc.). **Es lo primero que tenés que cargar** antes de los platos.

### Crear una categoría

1. En el menú lateral, andá a **Categorías**.
2. Hacé clic en **+ Nueva Categoría**.
3. Completá:
   - **Nombre** (obligatorio): ej. "Entradas".
   - **Descripción** (opcional).
   - **URL de imagen** (opcional): si subís una imagen, se usa en lugar del icono.
   - **Icono**: si no usás imagen, elegí uno de los emojis (🍽️ 🍕 🍔 🥗 🍰 🍺 ☕ 🥘 🍜 🍱 🌮 🍟) o escribí el tuyo.
   - **Visible en el menú**: dejalo tildado para que aparezca.
4. Hacé clic en **Crear**.

### Acciones disponibles sobre cada categoría
- 👁️ **Mostrar/Ocultar**: el ojo a la derecha. Útil para esconder temporalmente (ej. "Helados" en invierno).
- ✏️ **Editar**: cambiar nombre, icono, imagen.
- 🗑️ **Eliminar**: borrar la categoría. ⚠️ Solo se puede si no tiene platos asociados.

---

## 5. Cargar Productos (Platos)

Esta es la sección más importante. Cada plato/bebida/producto se carga acá.

### Agregar un plato manualmente

1. Andá a **Platos** en el menú lateral.
2. Hacé clic en **+ Nuevo Plato** (o en el Dashboard usá el acceso rápido "Agregar Plato").
3. Completá el formulario:

| Campo | Obligatorio | Descripción |
|---|---|---|
| **Nombre** | ✅ | Nombre del producto. Ej: "Milanesa Napolitana". |
| **Descripción** | — | Texto que verá el cliente. |
| **Precio** | ✅ | Solo números. Ej: `1500`. |
| **Stock** | ✅ | Cantidad disponible. Si va a 0, el plato se marca como agotado. |
| **Orden** | — | Número 1-10 para ordenar manualmente (1 aparece primero). |
| **Imagen (URL)** | — | Link directo a la foto del plato. |
| **Categoría** | ✅ | Elegí una sola tildando la tarjeta. |
| **Ingredientes** | — | Separados por comas: `carne, queso, jamón`. |
| **Alérgenos** | — | Separados por comas, **sin acentos**: `gluten, lacteos`. |
| **⭐ Producto destacado** | — | Si lo activás, aparece en el carrusel de destacados. |
| **🎁 Sugerir como incentivo** | — | Marca este plato como promoción especial. |
| **Etiquetas** | — | Tildá las que correspondan: 🌱 Vegetariano, 🌿 Vegano, 🌾 Sin Gluten, 🌶️ Picante. |

4. Hacé clic en **Guardar**.

### Editar / Eliminar / Destacar un plato

En la lista de **Platos** podés:
- Buscar por nombre.
- Filtrar por categoría.
- ⭐ Marcar/desmarcar como destacado con un clic.
- ✏️ Editar.
- 🗑️ Eliminar.

> 💡 **Stock = 0** → el plato aparece como "Agotado" en el menú público (no se puede pedir).

---

## 6. Importar el menú desde Excel

Si tenés muchos productos, en vez de cargarlos uno por uno, podés subir un Excel con todo.

### Paso a paso

1. Andá a **Importar** en el menú lateral.
2. Hacé clic en **Descargar Plantilla Excel** → se baja un archivo `plantilla-menu.xlsx`.
3. Abrí el Excel y completá una fila por cada plato. Columnas:

| Columna | Obligatoria | Ejemplo | Notas |
|---|---|---|---|
| `categoria` | ✅ | Entradas | Nombre de la categoría. Si no existe, se crea automáticamente. |
| `nombre` | ✅ | Empanadas de carne | |
| `descripcion` | — | Caseras al horno | |
| `precio` | ✅ | 1200 | Solo números, sin `$`. |
| `imagen_url` | — | https://... | URL de la foto. |
| `ingredientes` | — | carne,cebolla,huevo | Separados por comas. |
| `alergenos` | — | gluten,lacteos | **Sin acentos**. |
| `vegetariano` | — | si / no | Solo `si` o `no`. |

4. Guardá el Excel.
5. Volvé a **Importar**, hacé clic en **Seleccionar Archivo** y elegí tu Excel.
6. Hacé clic en **Importar Menú**.
7. Vas a ver el resultado: cuántos platos se crearon, cuántas categorías nuevas y si hubo errores (con número de fila).

> ⚠️ **No cambies los nombres de las columnas** del Excel ni borres ninguna. Si lo hacés, la importación falla.

---

## 7. Crear Anuncios y Promociones

Los **anuncios** aparecen como un cartel que se desliza arriba del menú (tipo banner). Sirven para comunicar promos, horarios especiales o avisos.

### Crear un anuncio

1. Andá a **Anuncios** → **+ Nuevo Anuncio**.
2. Completá:
   - **Mensaje** (máx. 200 caracteres): ej. *"Lunes a Viernes: 20% OFF Banco Galicia hasta las 11am"*.
   - **Icono**: elegí un emoji (📢 🎉 🔥 💰 ⭐ 🍕 🎁 💳) o escribí otro.
   - **Alcance**:
     - **🌐 Global**: aparece en todas las páginas del menú.
     - **Por categoría**: solo cuando el cliente entra a esa categoría.
   - **Activo**: tildado para que aparezca, destildado para ocultarlo sin borrarlo.
3. Hacé clic en **Crear**.

### Activar/Desactivar al instante

En la lista de anuncios, hacé clic en el botón **Activo/Inactivo** para encender o apagar sin necesidad de eliminar.

---

## 8. Activar y configurar Delivery

El delivery permite que clientes pidan a domicilio desde el menú público. El pedido se guarda en tu sistema y te llega por WhatsApp.

### Activar Delivery

1. Andá a **Configuración** → pestaña **Servicios**.
2. Tildá **Delivery**.
3. **Guardar Cambios**.

### Configurar costo de envío

1. Andá a **Configuración** → pestaña **Pedidos**.
2. Opciones:
   - **Envío Gratis**: tildalo y en el menú aparecerá "GRATIS".
   - **Costo fijo**: si destildaste lo anterior, escribí el costo. Si dejás `0`, aparecerá "A coordinar".
3. **Guardar Cambios**.

### Personalizar el mensaje de WhatsApp del pedido

En la misma pestaña **Pedidos**, hay un cuadro grande para el mensaje. Si lo dejás vacío, se usa el mensaje por defecto. Si querés personalizarlo, podés usar estas **variables** (se reemplazan solas con los datos reales):

| Variable | Reemplaza con |
|---|---|
| `{items}` | Lista de productos pedidos |
| `{subtotal}` | Subtotal del pedido |
| `{envio}` | Costo de envío |
| `{total}` | Total final |
| `{direccion}` | Dirección de entrega |
| `{telefono}` | Teléfono del cliente |
| `{notas}` | Notas que dejó el cliente |

**Ejemplo de mensaje personalizado**:
```
🛵 NUEVO PEDIDO

{items}

Subtotal: {subtotal}
Envío: {envio}
TOTAL: {total}

📍 Dirección: {direccion}
📞 Tel: {telefono}

Notas: {notas}
```

---

## 9. Activar y configurar el Sistema de Mozos

Si tenés mesas y querés que tus mozos tomen pedidos desde el celular, activá este sistema.

### Activar Sistema de Mozos

1. Andá a **Configuración** → pestaña **Pedidos**.
2. Tildá **Sistema de Mozos**.
3. **Guardar Cambios**.

> 💡 Al activarlo, en el menú lateral aparecen automáticamente las secciones **Mesas** y **Mozos**.

---

## 10. Cargar Mesas

Antes de que los mozos tomen pedidos, tenés que dar de alta las mesas del salón.

### Crear una mesa

1. Andá a **Mesas** → **+ Nueva Mesa**.
2. Completá:
   - **Número de mesa** (obligatorio): ej. `1`, `2`, `15`.
   - **Nombre / Sector** (opcional): ej. "Terraza", "VIP", "Salón".
   - **Capacidad**: cantidad de personas. Default: 4.
3. **Guardar**.

### Estados de una mesa
Cada mesa tiene un color según su estado:
- 🟢 **Libre** (verde): disponible para tomar pedido.
- 🔴 **Ocupada** (rojo): ya hay un pedido en curso.
- 🟡 **Reservada** (amarillo): reservada para una hora específica.

### Editar / Eliminar

En la grilla de mesas, cada tarjeta tiene los iconos ✏️ (editar) y 🗑️ (eliminar).

---

## 11. Cargar Mozos

Cada mozo debe tener su usuario propio para poder iniciar sesión en la app de mozos.

### Crear un mozo

1. Andá a **Mozos** → **+ Nuevo Mozo**.
2. Completá:
   - **Nombre** (obligatorio): nombre real del mozo.
   - **Email** (obligatorio): será su usuario para entrar.
   - **Contraseña** (obligatorio): mínimo 6 caracteres. Anotala y compartila con el mozo.
   - **Teléfono** (opcional).
3. **Guardar**.

### Editar / Desactivar un mozo

- ✏️ **Editar**: cambiar nombre, email, teléfono. También podés cambiarle la contraseña (dejá el campo vacío si no querés cambiarla).
- **Activo / Inactivo**: si el mozo dejó de trabajar, destildá **Mozo activo** en lugar de eliminarlo. Así guarda el historial.
- 🗑️ **Eliminar**: lo borra definitivamente.

---

## 12. Gestionar Pedidos

Todos los pedidos (de delivery y de mesa) caen acá en tiempo real.

Andá a **Pedidos** en el menú lateral. La pantalla se **refresca sola cada 30 segundos**, o podés hacer clic en **Actualizar**.

### Filtros disponibles
- **Tipo**: Todos / Delivery / Mesa.
- **Estado**: Todos / Nuevo / Preparando / Listo / Entregado / Cancelado.

### Cada pedido te muestra
- 🛵 (delivery) o 🪑 (mesa) y número de orden.
- Si es de mesa: número de mesa y nombre del mozo.
- Fecha y hora.
- Lista de productos con cantidades y precios.
- **Total**.
- Dirección y teléfono (si es delivery).
- Notas del cliente (si dejó).

### Flujo del pedido

Cada pedido pasa por estos estados:
1. **Nuevo** (azul) → recién entró.
2. **Preparando** (amarillo) → en cocina.
3. **Listo** (verde) → para entregar/servir.
4. **Entregado** (gris) → ya cerrado.

Para avanzar al siguiente estado, hacé clic en el botón **→ [Siguiente estado]**. También podés **Cancelar** un pedido si hace falta.

---

## 13. Cómo lo usa el cliente final (Menú Digital)

Este es el flujo que vive tu cliente cuando entra a ver el menú.

1. El cliente abre el link de tu restaurante (`tudominio.com/tu-restaurante`) o escanea el **QR** que tengas en la mesa.
2. Ve la pantalla principal con:
   - Logo y nombre del restaurante.
   - Banner de anuncios deslizándose arriba (si tenés activos).
   - Grilla de **categorías**.
3. Hace clic en una categoría y ve la lista de productos con foto, precio, descripción, ingredientes y etiquetas (🌱 vegetariano, 🌶️ picante, etc.).
4. Si el plato está **agotado**, lo ve marcado y no puede pedirlo.

> 💡 Si solo querés ofrecer el menú **como carta digital** (sin delivery ni pedidos), simplemente **desactivá Delivery** y no actives Sistema de Mozos. Los clientes verán todo el menú pero sin botones para pedir.

---

## 14. Cómo lo usa el cliente final (Delivery)

Si activaste Delivery, el flujo del cliente es:

1. Entra al menú (igual que antes).
2. Hace clic en **Delivery** desde el menú principal.
3. Navega categorías y va sumando productos al **carrito**:
   - Botón **+** para agregar.
   - Botón **−** para quitar.
4. Cuando termina, va al **Checkout** y completa:
   - **Dirección** de entrega.
   - **Teléfono** de contacto.
   - **Email** (opcional).
   - **Notas** del pedido (opcional).
5. Ve el resumen con subtotal + envío + total.
6. Hace clic en **Confirmar Pedido**:
   - El pedido se **guarda automáticamente** en tu sistema (lo ves en la sección **Pedidos**).
   - Se abre **WhatsApp** con el mensaje del pedido listo para enviar a tu número.

> 💡 Aunque el cliente no envíe el WhatsApp, el pedido **ya quedó guardado** en tu panel, así que no perdés ventas.

---

## 15. Cómo lo usa el Mozo (Salón)

Solo si activaste el **Sistema de Mozos**.

### Cómo entra el mozo

1. Desde el celular, el mozo abre `tudominio.com/mozo/tu-restaurante`.
2. Ingresa el **email** y la **contraseña** que vos le diste.
3. Hace clic en **Ingresar**.

### Lo que ve el mozo

- Su nombre arriba a la izquierda.
- Todas las mesas con colores: 🟢 libre, 🔴 ocupada, 🟡 reservada.
- Leyenda con los colores.

### Tomar un pedido

1. El mozo toca una mesa **libre** (verde).
2. Entra al menú interno: navega categorías y toca productos.
3. Cada producto suma con **+** y se resta con **−**.
4. Arriba se va viendo el contador de ítems del pedido.
5. Puede escribir **notas** (ej. "sin sal", "para llevar").
6. Toca **Enviar Pedido**:
   - El pedido se **guarda** en tu panel.
   - La mesa pasa automáticamente a 🔴 **Ocupada**.
   - Se abre WhatsApp con el mensaje del pedido.

### Liberar una mesa

Cuando los clientes se van:
1. El mozo toca una mesa **ocupada** (roja).
2. Aparece un cuadro: **¿Liberar mesa?**.
3. Toca **Liberar mesa** → vuelve a 🟢 verde.

### Cerrar sesión

Botón **Salir** arriba a la derecha.

---

## 16. Consejos y preguntas frecuentes

### ⭐ Orden recomendado para empezar de cero
1. Configuración → Info Básica, Tema, Contacto, Horarios.
2. Crear **Categorías**.
3. Cargar **Platos** (manual o por Excel).
4. Crear **Anuncios** (opcional).
5. Si vas a usar delivery → Configuración → Servicios + Pedidos (costo de envío, mensaje).
6. Si vas a usar mozos → Configuración → Pedidos → activar Sistema de Mozos → cargar Mesas → cargar Mozos.

### ❓ Preguntas frecuentes

**¿Cuánto tarda en aparecer un cambio?**
Es inmediato. En cuanto guardás, ya se ve en el menú público.

**¿Puedo tener delivery y mozos al mismo tiempo?**
Sí, los dos sistemas son independientes.

**Un plato no aparece en el menú público.**
Revisá:
- Que la **categoría** esté visible (👁️).
- Que el plato tenga **stock > 0**.
- Que tenga categoría asignada.

**El cliente confirma el pedido pero no me llega WhatsApp.**
El mensaje se abre en el celular del cliente, él tiene que apretar enviar. Pero **el pedido ya quedó guardado** en tu panel → revisalo en la sección **Pedidos**.

**¿Cómo cambio mi contraseña de admin?**
Por ahora se hace desde el panel del **Superadmin**. Pedile al soporte de Con Código Art que la actualice.

**¿Los mozos pueden ver el panel de admin?**
No. Cada mozo tiene un acceso limitado solo a `mozo/tu-restaurante`, donde ve únicamente mesas y el menú para tomar pedidos.

**¿Cómo cambio el número de WhatsApp donde llegan los pedidos?**
Configuración → pestaña **Contacto** → campo **WhatsApp** (incluir código de país: `5491123456789`).

**¿Puedo desactivar un plato sin borrarlo?**
Sí, ponele **Stock = 0**. Va a quedar como "Agotado" y no se puede pedir, pero los datos quedan guardados para reactivarlo después.

**¿Puedo tener una imagen distinta para cada categoría?**
Sí, en Categorías → Editar → URL de imagen. La imagen pisa al icono.

### 🆘 Soporte

Si tenés algún problema o duda, contactá al soporte de **Con Código Art** (concodigoart.com).
