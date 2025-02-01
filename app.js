import express from 'express'
import dotenv from 'dotenv'
import dbconnect from './config/mongo.js'
import expressConfig from './config/express.js'
import listRoutes from './app/middlewares/routesMiddleware.js'
import mongoose from 'mongoose'
mongoose.set('debug', true)

dotenv.config()
const app = express()
const port = process.env.PORT

expressConfig(app)
dbconnect()

listRoutes(app)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
