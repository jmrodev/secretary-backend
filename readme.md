# Secretary Backend

Este es el backend del proyecto Secretary, una aplicación para gestionar usuarios y citas. Está construido con Node.js, Express y MongoDB.

## Requisitos

- Node.js (v14 o superior)
- MongoDB

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tu-usuario/secretary-backend.git
   cd secretary-backend
   ```

2. Instala las dependencias:
   ```sh
   pnpm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```
   DB_URI=mongodb://localhost:27017/secretary-db
   PORT=3002
   SECRET_KEY=secretkey
   ```

4. Inicia el servidor:
   ```sh
   pnpm start
   ```

## Endpoints

### Usuarios

#### Registrar un nuevo usuario
- **POST** `/api/users/register`
- **Content-Type**: application/json
```json
{
  "userName": "newUser",
  "name": "New User",
  "email": "newuser@example.com",
  "password": "newPassword",
  "role": "secretary",
  "lastLogin": "2025-01-31T00:00:00.000Z",
  "isLocked": false,
  "lockUntil": null,
  "loginAttempts": 0
}
```

#### Iniciar sesión
- **POST** `/api/users/login`
- **Content-Type**: application/json
```json
{
  "userName": "newUser",
  "password": "newPassword"
}
```

#### Cerrar sesión
- **POST** `/api/users/logout`
- **Content-Type**: application/json
- **Authorization**: Bearer YOUR_BEARER_TOKEN

#### Obtener todos los usuarios
- **GET** `/api/users`
- **Content-Type**: application/json
- **Authorization**: Bearer YOUR_BEARER_TOKEN

#### Obtener un usuario específico
- **GET** `/api/users/:id`
- **Content-Type**: application/json
- **Authorization**: Bearer YOUR_BEARER_TOKEN

#### Crear un nuevo usuario
- **POST** `/api/users`
- **Content-Type**: application/json
- **Authorization**: Bearer YOUR_BEARER_TOKEN
```json
{
  "userName": "exampleUser8",
  "name": "Example Name",
  "email": "example8@example.com",
  "password": "examplePassword",
  "role": "secretary",
  "lastLogin": "2025-01-31T00:00:00.000Z",
  "isLocked": false,
  "lockUntil": null,
  "loginAttempts": 0
}
```

#### Actualizar un usuario
- **PUT** `/api/users/:id`
- **Content-Type**: application/json
- **Authorization**: Bearer YOUR_BEARER_TOKEN
```json
{
  "name": "Updated Name",
  "email": "updatedemail@example.com"
}
```

#### Eliminar un usuario
- **DELETE** `/api/users/:id`
- **Content-Type**: application/json
- **Authorization**: Bearer YOUR_BEARER_TOKEN

### Citas

#### Obtener todas las citas
- **GET** `/api/appointments`
- **Content-Type**: application/json
- **Authorization**: Bearer YOUR_BEARER_TOKEN

#### Obtener una cita específica
- **GET** `/api/appointments/:id`
- **Content-Type**: application/json
- **Authorization**: Bearer YOUR_BEARER_TOKEN

#### Crear una nueva cita
- **POST** `/api/appointments`
- **Content-Type**: application/json
- **Authorization**: Bearer YOUR_BEARER_TOKEN
```json
{
  "patient": "John Doe",
  "doctor": "Dr. Smith",
  "date": "2025-01-31T10:00:00.000Z",
  "time": "10:00 AM",
  "status": "scheduled"
}
```

#### Actualizar una cita
- **PUT** `/api/appointments/:id`
- **Content-Type**: application/json
- **Authorization**: Bearer YOUR_BEARER_TOKEN
```json
{
  "patient": "John Doe",
  "doctor": "Dr. Smith",
  "date": "2025-01-31T11:00:00.000Z",
  "time": "11:00 AM",
  "status": "rescheduled"
}
```

#### Eliminar una cita
- **DELETE** `/api/appointments/:id`
- **Content-Type**: application/json
- **Authorization**: Bearer YOUR_BEARER_TOKEN

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama:
   ```sh
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz commit:
   ```sh
   git commit -am 'Agrega nueva funcionalidad'
   ```
4. Sube tus cambios a tu fork:
   ```sh
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
