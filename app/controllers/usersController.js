import userModel from '../models/usersModel.js'
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
import httpError from '../helpers/handleErrors.js'

const getItems = async (req, res, next) => {
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

const getItem = async (req, res, next) => {
  try {
    const resDetail = await getUserById(req.params.id)
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

const createItem = async (req, res, next) => {
  try {
    const resDetail = await createUser(req.body)
    res.status(201).json({
      data: resDetail,
      message: 'Usuario creado',
      success: true
    })
  } catch (error) {
    httpError(res, error)
    next(error)
  }
}

const updateItem = async (req, res, next) => {
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

const deleteItem = async (req, res, next) => {
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

const registerUser = async (req, res, next) => {
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

const loginUser = async (req, res, next) => {
  try {
    const { userName, password } = req.body

    const user = await getUserByUserName(userName)
    if (!user) {
      return res.status(404).json(
        {
          message: 'User not found',
          success: false
        }
      )
    }

    if (user.isLocked && user.lockUntil > getCurrentDateTimeISO()) {
      return res.status(401).json(
        {
          message: 'User is locked. Try again later.',
          success: false
        }
      )
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      const loginAttempts = user.loginAttempts + 1
      const isLocked = loginAttempts > 3
      const lockUntil = isLocked ? addMillisecondsToCurrentDateTime(300000) : null

      await updateUser(user._id, { loginAttempts, isLocked, lockUntil })

      return res.status(401).json({ message: 'Invalid credentials' })
    }

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

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
      sameSite: 'strict'
    })

    const lastLogin = getCurrentDateTimeISO()
    await updateUser(user._id, { lastLogin, loginAttempts: 0, isLocked: false, lockUntil: null })

    res.status(200).json(
      {
        message: 'Login successful',
        success: true
      }
    )
  } catch (error) {
    httpError(res, error)
    next(error)
  }
}

const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie('token')
    res.status(200).json(
      {
        message: 'User logged out successfully',
        success: true
      }
    )
  } catch (error) {
    httpError(res, error)
    next(error)
  }
}

export { getItems, getItem, createItem, updateItem, deleteItem, registerUser, loginUser, logoutUser }
