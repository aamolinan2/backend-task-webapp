# API Backend - Task WebApp

Este proyecto es una API RESTful desarrollada en Node.js utilizando Express y TypeScript. Su propósito principal es gestionar usuarios y tareas para una aplicación de lista de tareas (To-Do List). Está diseñada para integrarse fácilmente con un frontend en Angular y puede desplegarse en Firebase.

## Características

- Gestión de usuarios (crear y consultar por correo electrónico)
- Gestión de tareas (crear, obtener, actualizar y eliminar)
- Middleware para CORS
- Variables de entorno para configuración
- Uso de módulos ECMAScript con soporte para TypeScript
- Validación de datos y respuesta en formato JSON
- Estructura de carpetas clara y mantenible

## Estructura del Proyecto

```
backend/
├── controllers/
│   ├── task.controller.ts
│   └── user.controller.ts
├── models/
│   ├── task.model.ts
│   └── user.model.ts
├── services/
│   ├── task.service.ts
│   └── user.service.ts
├── utils/
│   └── database.ts
├── app.ts
├── index.ts
├── tsconfig.json
├── package.json
├── .env
└── README.md
```

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/backend-task-webapp.git
cd backend-task-webapp
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` con el siguiente contenido:

```
PORT=3000
```

## Uso

### Ejecutar en desarrollo

```bash
npm run dev
```

### Compilar y ejecutar en producción

```bash
npm run build
npm start
```

### Ejecutar pruebas

```bash
npm run test
```

## Endpoints

### Usuarios

- `GET /users/:email` - Obtiene un usuario por su correo electrónico
- `POST /users` - Crea un nuevo usuario `{ email }`

### Tareas

- `GET /tasks` - Lista todas las tareas
- `POST /tasks` - Crea una nueva tarea
- `PUT /tasks/:id` - Actualiza una tarea por su ID
- `DELETE /tasks/:id` - Elimina una tarea por su ID

## Arquitectura

El proyecto sigue una arquitectura por capas:
- **Controller**: recibe la solicitud y coordina la lógica.
- **Service**: contiene la lógica de negocio.
- **Model**: gestiona los datos en memoria (puede adaptarse a una base de datos).
- **Utils**: utilidades comunes (como base de datos en memoria o utilidades globales).

## Recomendaciones para producción

- Autenticación y autorización con JWT 

