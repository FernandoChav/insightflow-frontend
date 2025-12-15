# 🎨 InsightFlow - Frontend Client

Interfaz de usuario moderna y responsiva para la plataforma de gestión documental **InsightFlow**. Desarrollada con **Next.js 14**, este cliente consume los microservicios del sistema para ofrecer una experiencia de edición de documentos basada en bloques (tipo Notion).

## 🔗 Despliegue en Producción

El frontend se encuentra desplegado como sitio estático en **Firebase Hosting** a través de un pipeline de CI/CD automatizado.

- **URL Pública:** [https://insightflow-frontend-ucn.web.app](https://insightflow-frontend-ucn.web.app)

---

## 🛠 Stack Tecnológico

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router).
- **Lenguaje:** TypeScript.
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) (Utility-first framework).
- **Iconografía:** Emojis nativos y SVGs optimizados.
- **Paquetes:** `pnpm` como gestor de dependencias.
- **Hosting:** Firebase Hosting (Static Export).

---

## 🏗 Arquitectura del Frontend

El proyecto sigue una estructura de **Modular Monolith** dentro del frontend para facilitar la escalabilidad y el mantenimiento. En lugar de agrupar por tipo de archivo, agrupamos por **funcionalidad**.

### Estructura de Carpetas Clave

````bash
src/
├── app/                 # Rutas de Next.js (App Router)
├── components/          # Componentes UI reutilizables (Botones, Modales, Inputs)
├── services/            # Capa de comunicación con la API (Fetch wrappers)
│   └── api/             # Definición de endpoints por microservicio
├── types/               # Definiciones de TypeScript (Interfaces compartidas)
└── views/               # Módulos funcionales (Vistas completas y su lógica)
    ├── workspace/       # Lógica y UI del listado de documentos
    └── document/        # Lógica y UI del editor de documentos
````

### Características Principales
1.  **Block-Based Editor:** Sistema de edición de contenido dinámico que soporta diferentes tipos de bloques (H1, H2, Párrafos, Checklists), similar a herramientas como Notion.
2.  **Optimistic UI:** La interfaz actualiza el estado localmente de inmediato (antes de confirmar con el servidor) para ofrecer una sensación de inmediatez al usuario.
3.  **Responsive Design:** Adaptado completamente para funcionar en escritorio y dispositivos móviles.
4.  **Gestión de Estado:** Uso de Custom Hooks (`useDocument`, `useWorkspace`) para separar la lógica de negocio de la capa de presentación.

---

## 🚀 Configuración Local

Sigue estos pasos para ejecutar el proyecto en tu entorno de desarrollo:

### 1. Prerrequisitos
* **Node.js 18+** instalado.
* **pnpm** instalado (recomendado) o npm/yarn.

### 2. Instalación
# Clonar el repositorio
```
git clone https://github.com/FernandoChav/insightflow-frontend.git
```

# Instalar dependencias
```
pnpm install
```

### 3. Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto para conectar con tu Backend.

**Importante:** GitHub Actions inyecta estas variables automáticamente en producción, pero en local debes definirlas manualmente para que la aplicación sepa a dónde enviar las peticiones.

```env
# URL del Microservicio de Documentos (Backend Local o Remoto)

# Opción A: Si estás corriendo el backend en Docker localmente
NEXT_PUBLIC_API_DOCUMENTS_URL=http://localhost:8080

# Opción B: Si quieres conectar tu local directamente al backend de Render (Nube)
NEXT_PUBLIC_API_DOCUMENTS_URL=https://insightflow-documents.onrender.com

# URL del Microservicio de Workspaces
NEXT_PUBLIC_WORKSPACE_API_BASE_URL="https://insightflow-workspace-service-fh1q.onrender.com/api/workspaces"

# URL del Microservicio de Usuarios
NEXT_PUBLIC_USERS_API_BASE_URL=https://insightflow-users-service-latest.onrender.com
```

### 4. Ejecutar en Desarrollo

Una vez configurado el archivo de entorno, levanta el servidor de desarrollo:

```bash
pnpm dev
```

La aplicación estará disponible en http://localhost:3000.

---

## 🔄 CI/CD y Despliegue (Pipeline)

Este repositorio cuenta con un flujo de trabajo automatizado en GitHub Actions (`.github/workflows/deploy.yml`) que realiza las siguientes tareas ante cada push a la rama `main`:

- **Install:** Instala las dependencias del proyecto usando `pnpm`.
- **Build:** Compila el proyecto en modo estático (`output: 'export'`) generando una carpeta `out`.
- **Inject Secrets:** Inyecta las variables de entorno de producción (URL del Backend) desde los Secretos de GitHub de manera segura durante el tiempo de compilación.
- **Deploy:** Sube el contenido de la carpeta `out` directamente a Firebase Hosting.

---

## 📦 Comunicación con Backend

El frontend se comunica con el microservicio de documentos mediante una arquitectura RESTful limpia y tipada.

**Service Layer:** [src/services/api/documents.ts](src/services/api/documents.ts)

**Patrón de Fetch:** Se utiliza `fetch` nativo encapsulado para manejar respuestas tipadas (`ApiResponse<T>`) y errores de red de forma centralizada, manteniendo los componentes de React limpios de lógica HTTP.

---

## � Manual de Usuario - Microservicios Backend

Este frontend consume tres microservicios backend independientes desarrollados por el equipo. A continuación se documenta cada servicio con sus endpoints disponibles.

### 🟢 SERVICIO DE USUARIOS (Users Service)

**Descripción:** Microservicio encargado de la gestión completa de usuarios del sistema. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los perfiles de usuario, incluyendo información personal, credenciales y estado de cuenta.

**URL Base (Local):** `http://localhost:3000` (configurable mediante variable de entorno)  
**Variable de entorno:** `NEXT_PUBLIC_USERS_API_BASE_URL`

#### Lista de Endpoints:

**1. Obtener Todos los Usuarios**

- **Método y Ruta:** `GET /api/users`
- **Body esperado:** Ninguno
- **Respuestas/Validaciones:**
  - `200 OK`: Retorna un array de usuarios (`User[]`)
  - Devuelve lista vacía `[]` si no hay usuarios registrados

**2. Obtener Usuario por ID**

- **Método y Ruta:** `GET /api/users/{userId}`
- **Parámetros de URL:**
  - `userId` (string, requerido): Identificador único del usuario
- **Body esperado:** Ninguno
- **Respuestas/Validaciones:**
  - `200 OK`: Retorna el usuario encontrado
  - `404 Not Found`: Si el usuario no existe

**3. Crear Nuevo Usuario**

- **Método y Ruta:** `POST /api/users`
- **Body esperado (JSON):**
  ```json
  {
    "fullName": "string (requerido)",
    "email": "string (requerido, formato email válido)",
    "username": "string (requerido)",
    "birthDate": "string (formato ISO 8601: YYYY-MM-DD)",
    "address": "string",
    "phoneNumber": "string"
  }
  ```
- **Respuestas/Validaciones:**
  - `201 Created`: Usuario creado exitosamente, retorna el objeto `User` con `id` generado
  - `400 Bad Request`: Si faltan campos requeridos o el formato es inválido
  - **Validación:** Email debe ser único en el sistema
  - **Validación:** Username debe ser único
  - Por defecto, el usuario se crea con `status: 'active'`

**4. Actualizar Usuario**

- **Método y Ruta:** `PATCH /api/users/{userId}`
- **Parámetros de URL:**
  - `userId` (string, requerido): ID del usuario a actualizar
- **Body esperado (JSON parcial):**
  ```json
  {
    "fullName": "string (opcional)",
    "email": "string (opcional)",
    "username": "string (opcional)",
    "status": "'active' | 'inactive' (opcional)",
    "birthDate": "string (opcional)",
    "address": "string (opcional)",
    "phoneNumber": "string (opcional)"
  }
  ```
- **Respuestas/Validaciones:**
  - `200 OK`: Usuario actualizado exitosamente, retorna el objeto `User` modificado
  - `404 Not Found`: Si el usuario no existe
  - `400 Bad Request`: Si el nuevo email/username ya está en uso por otro usuario

**5. Eliminar Usuario**

- **Método y Ruta:** `DELETE /api/users/{userId}`
- **Parámetros de URL:**
  - `userId` (string, requerido): ID del usuario a eliminar
- **Body esperado:** Ninguno
- **Respuestas/Validaciones:**
  - `204 No Content`: Usuario eliminado exitosamente (sin cuerpo de respuesta)
  - `404 Not Found`: Si el usuario no existe

---

### 🟡 SERVICIO DE ESPACIOS DE TRABAJO (Workspace Service)

**Descripción:** Microservicio diseñado para gestionar espacios de trabajo colaborativos (Workspaces). Cada workspace actúa como un contenedor de documentos y permite la asignación de miembros con roles específicos. Incluye manejo de archivos multimedia para iconos personalizados y control de permisos mediante ownership.

**URL Base (Local):** `http://localhost:8080` (configurable mediante variable de entorno)  
**Variable de entorno:** `NEXT_PUBLIC_WORKSPACE_API_BASE_URL`

#### Lista de Endpoints:

**1. Obtener Workspaces por Usuario**

- **Método y Ruta:** `GET /user/{userId}`
- **Parámetros de URL:**
  - `userId` (string, requerido): ID del usuario propietario
- **Body esperado:** Ninguno
- **Respuestas/Validaciones:**
  - `200 OK`: Retorna array de workspaces donde el usuario es propietario o miembro (`Workspace[]`)
  - Retorna solo workspaces activos (`isActive: true`)
  - Incluye información completa de miembros y roles

**2. Crear Workspace**

- **Método y Ruta:** `POST /`
- **Content-Type:** `multipart/form-data`
- **Body esperado (FormData):**
  ```
  Name: string (requerido) - Nombre del workspace
  Description: string (requerido) - Descripción del propósito
  Theme: string (requerido) - Tema visual (ej: "light", "dark", "blue")
  UserId: string (requerido) - ID del usuario creador (se convierte en owner)
  Icon: File (requerido) - Archivo de imagen para el ícono del workspace
  ```
- **Respuestas/Validaciones:**
  - `201 Created`: Workspace creado exitosamente, retorna objeto `Workspace` completo
  - `400 Bad Request`: Si faltan campos requeridos o el archivo no es válido
  - **Validación:** El archivo Icon debe ser una imagen válida (formatos soportados dependen del backend)
  - El creador se asigna automáticamente como `ownerId`
  - El workspace se crea con `isActive: true` por defecto
  - Se genera un `iconUrl` público accesible tras el upload

**3. Eliminar Workspace (Soft Delete)**

- **Método y Ruta:** `DELETE /{workspaceId}?requesterId={requesterId}`
- **Parámetros de URL:**
  - `workspaceId` (string, requerido): ID del workspace a eliminar
- **Parámetros de Query:**
  - `requesterId` (string, requerido): ID del usuario que solicita la eliminación
- **Body esperado:** Ninguno
- **Respuestas/Validaciones:**
  - `204 No Content`: Workspace marcado como inactivo exitosamente
  - `403 Forbidden`: Si el `requesterId` no coincide con el `ownerId` del workspace
  - `404 Not Found`: Si el workspace no existe
  - **Importante:** Esta operación NO elimina físicamente el registro, solo cambia `isActive: false` (Soft Delete)
  - Los documentos asociados permanecen intactos

---

### 📄 Modelo de Datos

#### User

```typescript
{
  id: string; // Identificador único generado por el sistema
  fullName: string; // Nombre completo del usuario
  email: string; // Correo electrónico (único)
  username: string; // Nombre de usuario (único)
  status: "active" | "inactive"; // Estado de la cuenta
  birthDate: string; // Fecha de nacimiento (ISO 8601)
  address: string; // Dirección física
  phoneNumber: string; // Número de teléfono
}
```

#### Workspace

```typescript
{
  id: string;              // Identificador único generado por el sistema
  name: string;            // Nombre del workspace
  description: string;     // Descripción del workspace
  theme: string;           // Tema visual aplicado
  iconUrl: string;         // URL pública del ícono subido
  ownerId: string;         // ID del usuario propietario
  members: [               // Lista de miembros con roles
    {
      userId: string;      // ID del miembro
      role: string;        // Rol asignado (ej: "editor", "viewer")
    }
  ];
  isActive: boolean;       // Indica si el workspace está activo (Soft Delete)
}
```

---

## �👤 Autores

**Autores:** - Fernando Chávez Briceño Rut 21.180.530-7, - Daniel Tomigo Contreras - 21.564.036-1 , - Nicolas Diaz Juica - 20949349-7

**Asignatura:** Taller de Arquitectura de Software  

**Universidad:** Universidad Católica del Norte
