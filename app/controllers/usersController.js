import httpError from '../helpers/handleErrors.js'
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByUserName
} from '../repositories/usersRepository.js'
import { getCurrentDateTimeISO, addMillisecondsToCurrentDateTime } from '../helpers/dateTimeHelper.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const getItems = async (req, res) => {
  try {
    const resDetail = await getAllUsers()
    res.status(200).json({ data: resDetail })
  } catch (error) {
    httpError(res, error)
  }
}

const getItem = async (req, res) => {
  try {
    const resDetail = await getUserById(req.params.id)
    if (!resDetail) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ data: resDetail })
  } catch (error) {
    httpError(res, error)
  }
}

const createItem = async (req, res) => {
  try {
    const resDetail = await createUser(req.body)
    res.status(201).json({ data: resDetail })
  } catch (error) {
    httpError(res, error)
  }
}

const updateItem = async (req, res) => {
  try {
    const resDetail = await updateUser(req.params.id, req.body)
    if (!resDetail) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ data: resDetail })
  } catch (error) {
    httpError(res, error)
  }
}

const deleteItem = async (req, res) => {
  try {
    const resDetail = await deleteUser(req.params.id)
    if (!resDetail) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted' })
  } catch (error) {
    httpError(res, error)
  }
}

const registerUser = async (req, res) => {
  try {
    const { userName, name, email, password, role, lastLogin, isLocked, lockUntil, loginAttempts } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await createUser({
      userName,
      name,
      email,
      password: hashedPassword,
      role,
      lastLogin,
      isLocked,
      lockUntil,
      loginAttempts
    })
    res.status(201).json({ data: user })
  } catch (error) {
    httpError(res, error)
  }
}

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body

    // Buscar al usuario por nombre de usuario
    const user = await getUserByUserName(userName)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Verificar si el usuario está bloqueado
    if (user.isLocked && user.lockUntil > getCurrentDateTimeISO()) {
      return res.status(401).json({ message: 'User is locked. Try again later.' })
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      // Incrementar intentos de inicio de sesión
      const loginAttempts = user.loginAttempts + 1
      const isLocked = loginAttempts > 3
      const lockUntil = isLocked ? addMillisecondsToCurrentDateTime(300000) : null // Bloquear por 5 minutos

      // Actualizar el usuario con los nuevos intentos y estado de bloqueo
      await updateUser(user._id, { loginAttempts, isLocked, lockUntil })

      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Si la contraseña es correcta, restablecer los intentos y generar el token
    const token = jwt.sign(
      {
        id: user._id,
        userName: user.userName,
        role: user.role
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h'
      }
    )

    // Establecer el token en una cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hora en milisegundos
      sameSite: 'strict'
    })

    // Actualizar el último inicio de sesión y restablecer los intentos
    const lastLogin = getCurrentDateTimeISO()
    await updateUser(user._id, { lastLogin, loginAttempts: 0, isLocked: false, lockUntil: null })

    // Enviar respuesta exitosa
    res.status(200).json({ message: 'Login successful', token })
  } catch (error) {
    httpError(res, error)
  }
}

const logoutUser = async (req, res) => {
  try {
    // Eliminar la cookie 'token'
    res.clearCookie('token')
    res.status(200).json({ message: 'User logged out successfully' })
  } catch (error) {
    httpError(res, error)
  }
}

export { getItems, getItem, createItem, updateItem, deleteItem, registerUser, loginUser, logoutUser }
