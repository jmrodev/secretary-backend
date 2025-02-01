import userModel from '../models/usersModel.js'

const getAllUsers = async () => {
  return await userModel.find({})
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
