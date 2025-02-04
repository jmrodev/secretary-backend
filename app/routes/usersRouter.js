import express from 'express'
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  loginUser,
  logoutUser,
  registerUser
} from '../controllers/usersController.js'
import validateToken from '../middlewares/authMiddleware.js'
import logHeaders from '../middlewares/logMiddleware.js'
import roleMiddleware from '../middlewares/roleMiddleware.js'

const router = express.Router()

// Middleware para registrar los encabezados de la solicitud
router.use(logHeaders)

// Rutas para manejar usuarios
router.post('/login', loginUser) // Iniciar sesión
router.post('/logout', validateToken, logoutUser) // Cerrar sesión (requiere token)
router.post(
  '/register',
  validateToken,
  roleMiddleware('users', 'create'),
  registerUser
) // Registrar un nuevo usuario (requiere rol)
router.get('/', validateToken, roleMiddleware('users', 'read'), getItems) // Obtener todos los usuarios (requiere rol)
router.get('/:id', validateToken, roleMiddleware('users', 'read'), getItem) // Obtener un usuario por ID (requiere rol)
router.post('/', validateToken, roleMiddleware('users', 'create'), createItem) // Crear un nuevo usuario (requiere rol)
router.put('/:id', validateToken, roleMiddleware('users', 'update'), updateItem) // Actualizar un usuario existente (requiere rol)
router.delete('/:id', validateToken, roleMiddleware('users', 'delete'), deleteItem) // Eliminar un usuario (requiere rol)

export default router
