import userModel from '../models/usersModel.js'

const getAllUsers = async (skip = 0, limit = 10) => {
  const users = await userModel.find({}).skip(skip).limit(limit)
  const total = await userModel.countDocuments()
  return { users, total }
}

const getUserById = async (id) => {
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
