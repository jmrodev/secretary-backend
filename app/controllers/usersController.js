import httpError from '../helpers/handleErrors.js'
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByUserName
} from '../repositories/usersRepository.js'
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
    const user = await createUser({ userName, name, email, password: hashedPassword, role, lastLogin, isLocked, lockUntil, loginAttempts })
    res.status(201).json({ data: user })
  } catch (error) {
    httpError(res, error)
  }
}

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body
    const user = await getUserByUserName(userName)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' })
    res.status(200).json({ token })
  } catch (error) {
    httpError(res, error)
  }
}

const logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: 'User logged out' })
  } catch (error) {
    httpError(res, error)
  }
}

export { getItems, getItem, createItem, updateItem, deleteItem, registerUser, loginUser, logoutUser }
