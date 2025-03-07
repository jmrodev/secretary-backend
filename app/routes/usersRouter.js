import express from 'express'
import {
  getUsersController,
  getUserController,
  createUserController,
  updateUserController,
  deleteUserController,
  loginUserController,
  logoutUserController,
  registerUserController
} from '../controllers/usersController.js'
import validateToken from '../middlewares/authMiddleware.js'
import logHeaders from '../middlewares/logMiddleware.js'
import roleMiddleware from '../middlewares/roleMiddleware.js'

const router = express.Router()

router.use(logHeaders)

router.post('/login', loginUserController)

router.post('/logout', validateToken, logoutUserController)

router.post('/register', registerUserController)

router.get('/', validateToken, roleMiddleware('users', 'read'), getUsersController)

router.get('/name/:name', validateToken, roleMiddleware('users', 'read'), getUserController)

router.post('/', validateToken, roleMiddleware('users', 'create'), createUserController)

router.put('/:id', validateToken, roleMiddleware('users', 'update'), updateUserController)

router.delete('/:id', validateToken, roleMiddleware('users', 'delete'), deleteUserController)

export default router
