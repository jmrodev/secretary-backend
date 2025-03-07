import mongoose from 'mongoose'
import User from '../models/usersModel.js' // Asegúrate de que la ruta al modelo de usuario sea correcta

const dbconnect = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/secretary-db', {

    })
    console.log('Database connected')
  } catch (error) {
    console.error('Database connection error:', error)
    process.exit(1)
  }
}

const deleteUsersExceptJmro = async () => {
  try {
    const result = await User.deleteMany({
      userName: { $not: { $regex: /^jmro/ } }
    })
    console.log(`Deleted ${result.deletedCount} users`)
  } catch (error) {
    console.error('Error deleting users:', error)
  }
}

dbconnect().then(() => {
  deleteUsersExceptJmro()
    .then(() => {
      console.log(
        'Users deleted except those with username starting with "jmro"'
      )
      process.exit()
    })
    .catch((error) => {
      console.error('Error:', error)
      process.exit(1)
    })
})
