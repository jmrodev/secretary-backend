import express from 'express'
import dotenv from 'dotenv'
import dbconnect from './config/mongo.js'
import expressConfig from './config/express.js'
import listRoutes from './app/middlewares/routesMiddleware.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

mongoose.set('debug', true)

dotenv.config()
const app = express()
app.use(cookieParser())

const port = process.env.PORT

expressConfig(app)
dbconnect()

listRoutes(app)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
