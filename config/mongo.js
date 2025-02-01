import mongoose from 'mongoose'

const dbconnect = () => {
  const PORT = process.env.PORT
  const DB_URI = process.env.DB_URI
  mongoose.connect(DB_URI, {
  }).then(() => {
    console.log('Database connected in port', PORT)
  }).catch((err) => {
    console.log('Database connection failed', err)
    setTimeout(dbconnect, 5000)
  })
}
export default dbconnect
