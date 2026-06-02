# Ruta de trabajo del Sistema Centralizado de Formularios Multitenant

Este documento detalla el plan de desarrollo modular para construir el backend utilizando TypeScript, PostgreSQL y Prisma ORM. El flujo de trabajo emula un entorno profesional mediante el uso de ramas específicas de Git para cada funcionalidad.

---

## Modulo 1: Configuracion del Entorno y Base de Datos
**Nombre de la rama:** `feature/database-setup`

### Objetivos
* Inicializar el proyecto con Node.js y TypeScript.
* Configurar la conexion local a PostgreSQL.
* Definir el esquema de datos con Prisma ORM, contemplando relaciones y campos dinamicos.

### Tareas a realizar
1. Inicializar el repositorio Git y crear la rama de desarrollo.
2. Configurar el archivo `package.json`, `tsconfig.json` y las variables de entorno `.env`.
3. Instalar Prisma ORM como dependencia de desarrollo e inicializarlo.
4. Diseñar el archivo `schema.prisma` con las siguientes entidades:
    * `User`: Identificador, email, contraseña encriptada y marcas de tiempo.
    * `Project`: Identificador, nombre de la landing, clave de API unica, relacion con el usuario y marcas de tiempo.
    * `FormSubmission`: Identificador, nombre del formulario, payload de tipo JSONB, relacion con el proyecto y marcas de tiempo.
5. Ejecutar la primera migracion para impactar el esquema en la base de datos PostgreSQL local.

---

## Modulo 2: Arquitectura del Servidor y Estructura Base
**Nombre de la rama:** `feature/server-architecture`

### Objetivos
* Levantar el servidor HTTP base.
* Implementar una estructura de carpetas escalable (Patron Controlador-Servicio o similar).
* Centralizar el manejo de errores y configuracion de CORS.

### Tareas a realizar
1. Instalar el framework web (Express o Fastify) y los tipos de TypeScript correspondientes.
2. Configurar la aplicacion principal para admitir solicitudes JSON.
3. Configurar CORS especificando los origenes permitidos (direcciones locales de desarrollo de tus landings).
4. Implementar un middleware global para la captura y formateo de errores de la API.
5. Crear un controlador de prueba de estado del servidor (Health Check).

---

## Modulo 3: API Publica de Captura de Formularios
**Nombre de la rama:** `feature/submissions-api`

### Objetivos
* Permitir que las landing pages envien datos de formularios de manera segura sin requerir autenticacion de usuario (sesion).
* Validar que los datos provengan de un origen autorizado mediante una API Key.

### Tareas a realizar
1. Crear un middleware de validacion de API Key que intercepte las solicitudes, busque la clave en la base de datos y verifique la existencia del proyecto.
2. Desarrollar el endpoint `POST /api/v1/submissions`.
3. Implementar la logica en el servicio para recibir el objeto `payload` de la landing page e insertarlo directamente en la columna JSONB de la tabla `FormSubmission`.
4. Realizar pruebas de integracion utilizando clientes HTTP (como Postman o Bruno) simulando el envio desde tu portfolio y desde Navixsoft.

---

## Modulo 4: Sistema de Autenticacion para la Aplicacion Web
**Nombre de la rama:** `feature/auth-dashboard`

### Objetivos
* Permitir el registro e inicio de sesion de los usuarios administradores en la futura aplicacion web.
* Proteger las rutas administrativas mediante tokens Web de JSON (JWT).

### Tareas a realizar
1. Instalar dependencias para el hashing de contraseñas (bcrypt) y manejo de tokens (jsonwebtoken).
2. Desarrollar el endpoint `POST /api/v1/auth/register` asegurando que no se dupliquen correos electronicos.
3. Desarrollar el endpoint `POST /api/v1/auth/login` que valide las credenciales y retorne un token JWT firmado.
4. Implementar el middleware `authenticateJWT` para extraer, verificar y decodificar el token de los encabezados de las solicitudes privadas, inyectando la identidad del usuario en el objeto de la solicitud.

---

## Modulo 5: API Privada para el Panel de Control
**Nombre de la rama:** `feature/dashboard-api`

### Objetivos
* Exponer los datos de los proyectos y formularios exclusivamente a sus respectivos dueños.
* Garantizar el aislamiento de datos entre diferentes usuarios del sistema.

### Tareas a realizar
1. Desarrollar el endpoint `GET /api/v1/projects` para listar unicamente los proyectos pertenecientes al usuario autenticado.
2. Desarrollar el endpoint `POST /api/v1/projects` para permitir al usuario registrar una nueva landing page y generar su correspondiente API Key de forma automatica.
3. Desarrollar el endpoint `GET /api/v1/projects/:projectId/submissions` para listar los formularios recibidos en una landing especifica.
4. Implementar una verificacion de seguridad estricta: antes de retornar los formularios, el sistema debe comprobar que el `projectId` solicitado pertenece al `userId` que realiza la peticion. Si no coincide, denegar el acceso.

---

## Modulo 6: Preparacion para Produccion y Despliegue en la Nube
**Nombre de la rama:** `feature/production-deploy`

### Objetivos
* Optimizar el codigo TypeScript para produccion.
* Migrar la base de datos a un entorno en la nube y desplegar la aplicacion.

### Tareas a realizar
1. Configurar los scripts de compilacion (`tsc`) en el archivo `package.json` para generar codigo JavaScript optimizado en una carpeta de distribucion.
2. Configurar variables de entorno estrictas para produccion (Base de datos en la nube, secretos de JWT complejos).
3. Configurar el proceso de ejecucion automatica de migraciones de Prisma durante el despliegue.
4. Documentar los pasos finales de despliegue en la plataforma elegida (como Render, Railway o similares).ca