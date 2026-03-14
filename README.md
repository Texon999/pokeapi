#  Backend Hotel Costa Azul

API REST para el sistema de gestión de reservas del Hotel Costa Azul.
Construida con Node.js, Express y MySQL siguiendo arquitectura por capas.

---

##  Tecnologías

- **Node.js** — entorno de ejecución
- **Express** — framework web
- **MySQL2** — base de datos relacional
- **bcryptjs** — hasheo de contraseñas
- **jsonwebtoken** — autenticación con JWT
- **dotenv** — variables de entorno
- **cors** — comunicación con el frontend

---

##  Estructura del proyecto

```
backend-costa-azul/
├── config/
│   └── db.js                 ← conexión al pool de MySQL
├── controller/
│   ├── authController.js     ← maneja req/res de autenticación
│   └── reservationController.js ← maneja req/res de reservas
├── middlewares/
│   └── authMiddleware.js     ← valida JWT en rutas protegidas
├── models/
│   └── db.sql                ← esquema de la base de datos
├── repositories/
│   ├── userRepository.js     ← queries de usuario
│   └── reservationRepository.js ← queries de reservas
├── routes/
│   ├── authRoutes.js         ← rutas de autenticación
│   └── reservationRoutes.js  ← rutas de reservas
├── services/
│   ├── authService.js        ← lógica de autenticación
│   └── reservationService.js ← lógica de reservas
├── app.js                    ← configuración de Express
├── server.js                 ← punto de entrada
└── .env                      ← variables de entorno
```

---

##  Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/backend-costa-azul.git
cd backend-costa-azul
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tupassword
DB_NAME=hotel_costa_azul
JWT_SECRET=clave_secreta_larga_y_segura
JWT_EXPIRES_IN=7d
```

### 4. Crear la base de datos

Abre MySQL Workbench o tu cliente SQL y ejecuta el archivo `models/db.sql`:

```sql
CREATE DATABASE IF NOT EXISTS hotel_costa_azul;
USE hotel_costa_azul;

CREATE TABLE IF NOT EXISTS usuario (
  id_usuario         INT AUTO_INCREMENT PRIMARY KEY,
  nombre_usuario     VARCHAR(100) NOT NULL UNIQUE,
  contrasena_usuario VARCHAR(255) NOT NULL,
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sede (
  id_sede     INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(150) NOT NULL,
  ciudad      VARCHAR(100) NOT NULL,
  direccion   VARCHAR(150) NOT NULL,
  imagen_url  VARCHAR(500) NOT NULL,
  precio_base DECIMAL(10,2) NOT NULL,
  descripcion VARCHAR(300)
);

CREATE TABLE IF NOT EXISTS reserva (
  id_reserva   INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario   INT NOT NULL,
  id_sede      INT NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin    DATE NOT NULL,
  precio       DECIMAL(10,2) NOT NULL,
  estado       ENUM('pendiente','confirmada','cancelada','completada') NOT NULL DEFAULT 'pendiente',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_sede)    REFERENCES sede(id_sede)
);
```

### 5. Insertar datos de prueba (sedes)

```sql
INSERT INTO sede (nombre, ciudad, direccion, imagen_url, precio_base, descripcion)
VALUES
  ('Hotel Costa Azul', 'Cartagena', 'Av. Bocagrande #23-45',
   'https://images.unsplash.com/photo-1566073771259-6a8506099945', 250000,
   'Hotel frente al mar con vista panorámica'),
  ('Hotel Dann Carlton', 'Bogotá', 'Calle 97 #15-60',
   'https://images.unsplash.com/photo-1564501049412-61c2a3083791', 180000,
   'Hotel ejecutivo en el corazón de la ciudad'),
  ('Hotel Entonces', 'Medellín', 'El Poblado #43-28',
   'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa', 150000,
   'Boutique hotel en el mejor sector de Medellín');
```

### 6. Iniciar el servidor

```bash
# desarrollo
npm run dev

# producción
npm start
```

El servidor corre en `http://localhost:3000`

---

## 🔐 Arquitectura por capas

```
Request
   │
   ▼
Routes         → define URLs y métodos HTTP
   │
   ▼
Middleware     → valida el token JWT (rutas protegidas)
   │
   ▼
Controllers    → recibe req, llama al service, devuelve res
   │
   ▼
Services       → lógica de negocio y validaciones
   │
   ▼
Repositories   → única capa que habla con MySQL
   │
   ▼
Base de datos
```

---

##  Endpoints

### Autenticación — `/api/auth`

> Rutas públicas, no requieren token

---

#### `POST /api/auth/register` — Registrar usuario

**Body:**
```json
{
  "user": "",
  "password": ""
}
```

**Respuesta exitosa `201`:**
```json
{
  "ok": true,
  "data": {
    "id": 1,
    "user": ""
  }
}
```

**Errores posibles:**
```json
{ "ok": false, "message": "Usuario y contraseña son obligatorios" }
{ "ok": false, "message": "Este usuario ya está registrado" }
```

---

#### `POST /api/auth/login` — Iniciar sesión

**Body:**
```json
{
  "user": "",
  "password": ""
}
```

**Respuesta exitosa `200`:**
```json
{
  "ok": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "user": ""
  }
}
```

**Errores posibles:**
```json
{ "ok": false, "message": "Falta usuario o contraseña" }
{ "ok": false, "message": "Usuario o contraseña incorrectos" }
```

>  Guarda el token — lo necesitas para todos los endpoints de reservas.

---

### Reservas — `/api/reservas`

> Rutas protegidas — requieren token en el header:
> `Authorization: Bearer eyJhbGci...`

---

#### `POST /api/reservas` — Crear reserva

El `id_usuario` se extrae automáticamente del token, no hace falta enviarlo.

**Headers:**
```
Authorization: Bearer eyJhbGci...
```

**Body:**
```json
{
  "id_sede": 1,
  "fecha_inicio": "2024-03-01",
  "fecha_fin": "2024-03-05",
  "precio": 250000
}
```

**Respuesta exitosa `201`:**
```json
{
  "ok": true,
  "data": {
    "id_reserva": 1,
    "id_usuario": 1,
    "id_sede": 1,
    "fecha_inicio": "2024-03-01T00:00:00.000Z",
    "fecha_fin": "2024-03-05T00:00:00.000Z",
    "precio": "250000.00",
    "estado": "pendiente",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

**Errores posibles:**
```json
{ "ok": false, "message": "Todos los campos son obligatorios" }
{ "ok": false, "message": "Token requerido" }
{ "ok": false, "message": "Token expirado" }
```

---

#### `GET /api/reservas/me` — Ver mis reservas

Devuelve solo las reservas del usuario autenticado.

**Headers:**
```
Authorization: Bearer eyJhbGci...
```

**Body:** ninguno

**Respuesta exitosa `200`:**
```json
{
  "ok": true,
  "data": [
    {
      "id_reserva": 1,
      "fecha_inicio": "2024-03-01T00:00:00.000Z",
      "fecha_fin": "2024-03-05T00:00:00.000Z",
      "precio": "250000.00",
      "estado": "pendiente",
      "nombre": "Hotel Costa Azul",
      "ciudad": "Cartagena"
    }
  ]
}
```

**Si no tiene reservas:**
```json
{
  "ok": true,
  "data": []
}
```

---

##  Flujo completo — ejemplo de uso

```
1. Registrar usuario
   POST /api/auth/register
   { "user": "carlos", "password": "123456" }
   → usuario creado en la BD con contraseña hasheada

2. Iniciar sesión
   POST /api/auth/login
   { "user": "carlos", "password": "123456" }
   → recibe token JWT

3. Crear reserva (con token)
   POST /api/reservas
   Authorization: Bearer eyJhbGci...
   { "id_sede": 1, "fecha_inicio": "2024-03-01", ... }
   → middleware valida token → extrae id_usuario
   → reserva creada con estado "pendiente"

4. Ver mis reservas (con token)
   GET /api/reservas/me
   Authorization: Bearer eyJhbGci...
   → devuelve solo las reservas del usuario autenticado
```

---

##  Seguridad implementada

| Medida | Descripción |
|---|---|
| Contraseñas hasheadas | bcrypt con  salt rounds |
| JWT  expira en 7 días 
| SQL injection  Placeholders `?` en todas las queries |
| Mensaje genérico  Login no revela si el usuario existe |
| id_usuario del token  El cliente no puede falsificar su identidad |

---

##  Probar con Postman

1. Importa las peticiones en orden
2. Haz login y copia el token de la respuesta
3. En cada petición protegida ve a `Authorization → Bearer Token` y pega el token
4. Asegúrate de tener al menos una sede insertada en la BD antes de crear reservas

---

## 📌 Estado actual del proyecto

```
✅ Registro de usuarios
✅ Login con JWT
✅ Middleware de autenticación
✅ Crear reserva
✅ Ver mis reservas

⬜ Consultar reservas por fechas
⬜ Consultar reservas por estado
⬜ Actualizar reserva
⬜ Eliminar reservas canceladas
⬜ Estadísticas
⬜ Integración con frontend React
```
