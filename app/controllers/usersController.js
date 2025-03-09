import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserByUserName
} from '../repositories/usersRepository.js'
import { getCurrentDateTimeISO, addMillisecondsToCurrentDateTime } from '../helpers/dateTimeHelper.js'
import bcrypt from 'bcrypt'
import httpError from '../helpers/handleErrors.js'
import { generateToken, setToken } from '../helpers/token.js'

const registerUserController = async (req, res, next) => {
  try {
    const { userName, name, email, password, role } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await createUser({
      userName,
      name,
      email,
      password: hashedPassword,
      role
    })
    res.status(201).json(
      {
        message: 'User created',
        success: true,
        data: user
      }
    )
  } catch (error) {
    httpError(res, error)
    next(error)
  }
}

const loginUserController = async (req, res, next) => {
  try {
    const { userName, password } = req.body

    // Validar campos requeridos
    if (!userName?.trim()) {
      return res.status(400).json({
        message: 'El nombre de usuario es requerido',
        success: false
      })
    }

    if (!password) {
      return res.status(400).json({
        message: 'La contraseña es requerida',
        success: false
      })
    }

    const user = await getUserByUserName(userName)
    if (!user) {
      return res.status(401).json({
        message: 'Usuario no encontrado',
        success: false
      })
    }

    if (user.isLocked && user.lockUntil > getCurrentDateTimeISO()) {
      const waitMinutes = Math.ceil((new Date(user.lockUntil) - new Date()) / 60000)
      return res.status(401).json({
        message: `Usuario bloqueado. Inténtelo nuevamente en ${waitMinutes} minutos.`,
        success: false,
        lockUntil: user.lockUntil
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      const loginAttempts = (user.loginAttempts || 0) + 1
      const maxAttempts = 3
      const isLocked = loginAttempts >= maxAttempts
      const lockUntil = isLocked ? addMillisecondsToCurrentDateTime(300000) : null

      await updateUser(user._id, { loginAttempts, isLocked, lockUntil })

      if (isLocked) {
        return res.status(401).json({
          message: 'Demasiados intentos fallidos. Usuario bloqueado por 5 minutos.',
          success: false,
          lockUntil
        })
      }

      return res.status(401).json({
        message: `Usuario o contraseña incorrectos. Le quedan ${maxAttempts - loginAttempts} intentos.`,
        success: false
      })
    }

    const token = generateToken(user)
    setToken(res, token)

    const lastLogin = getCurrentDateTimeISO()
    await updateUser(user._id, {
      lastLogin,
      loginAttempts: 0,
      isLocked: false,
      lockUntil: null
    })

    // Enviar respuesta al frontend
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      success: true,
      token,
      user: {
        id: user._id,
        userName: user.userName,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin
      }
    })
  } catch (error) {
    httpError(res, error)
    next(error)
  }
}

const logoutUserController = async (req, res, next) => {
  try {
    res.clearCookie('token')
    res.status(200).json(
      {
        message: 'Sesión cerrada exitosamente',
        success: true
      }
    )
  } catch (error) {
    httpError(res, error)
    next(error)
  }
}

const getUsersController = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const { users, total } = await getAllUsers(skip, limit)

    res.status(200).json({
      data: users,
      message: 'Users found',
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    next(error)
  }
}

const getUserController = async (req, res, next) => {
  try {
    const resDetail = await getUserByUserName(req.params.id)
    if (!resDetail) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({
      data: resDetail,
      message: 'User found',
      success: true
    })
  } catch (error) {
    if (error.message === 'Invalid ID format') {
      return res.status(400).json({ message: 'Invalid ID format', success: false })
    }
    httpError(res, error)
    next(error)
  }
}

const createUserController = async (req, res, next) => {
  try {
    const resDetail = await createUser(req.body)
    res.status(201).json({
      data: resDetail,
      message: 'User created',
      success: true
    })
  } catch (error) {
    httpError(res, error)
    next(error)
  }
}

const updateUserController = async (req, res, next) => {
  try {
    const resDetail = await updateUser(req.params.id, req.body)
    if (!resDetail) {
      return res.status(404).json(
        {
          message: 'User not found',
          success: false
        }
      )
    }
    res.status(200).json({ data: resDetail })
  } catch (error) {
    httpError(res, error)
    next(error)
  }
}

const deleteUserController = async (req, res, next) => {
  try {
    const resDetail = await deleteUser(req.params.id)
    if (!resDetail) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(
      {
        message: 'User deleted',
        success: true
      }
    )
  } catch (error) {
    httpError(res, error)
    next(error)
  }
}


export { getUsersController, getUserController, createUserController, updateUserController, deleteUserController, registerUserController, loginUserController, logoutUserController }
