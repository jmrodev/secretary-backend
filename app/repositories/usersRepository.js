import userModel from '../models/usersModel.js'
import mongoose from 'mongoose' // Import mongoose to use ObjectId

const getAllUsers = async (skip = 0, limit = 10) => {
  const users = await userModel.find({}).skip(skip).limit(limit)
  const total = await userModel.countDocuments()
  return { users, total }
}

const getUserById = async (id) => {
  // Check if the provided id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID format')
  }
  return await userModel.findById(id)
}

const getUserByUserName = async (userName) => {
  return await userModel.findOne({ userName })
}

const createUser = async (userData) => {
  return await userModel.create(userData)
}

const updateUser = async (id, userData) => {
  return await userModel.findByIdAndUpdate(id, userData, { new: true })
}

const deleteUser = async (id) => {
  return await userModel.findByIdAndDelete(id)
}

export { getAllUsers, getUserById, getUserByUserName, createUser, updateUser, deleteUser }
