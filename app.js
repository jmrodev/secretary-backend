import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// Importar configuraciones y middlewares
import dbconnect from './config/mongo.js'
import expressConfig from './config/express.js'
import listRoutes from './app/middlewares/routesMiddleware.js'
import errorMiddleware from './app/middlewares/errorMiddleware.js'

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Cargar variables de entorno
dotenv.config({ path: `${__dirname}/.env` })

// Crear la aplicación Express
const app = express()

// Configuración básica de CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'X-Client-Timeout', 'access-control-allow-credentials'],
  exposedHeaders: ['Set-Cookie']
}))

// Habilitar preflight para todas las rutas
app.options('*', cors())

// Middlewares básicos
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Configuración de MongoDB
mongoose.set('debug', process.env.NODE_ENV !== 'production')

// Inicializar la aplicación
const initializeApp = async () => {
  try {
    // Conectar a la base de datos
    await dbconnect()
    console.log('Conexión a MongoDB establecida')

    // Configuración adicional de Express
    expressConfig(app)

    // Configurar rutas
    listRoutes(app)

    // Manejo de errores
    app.use(errorMiddleware)
    app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: `Ruta ${req.originalUrl} no encontrada`
      })
    })

    // Iniciar el servidor
    const port = process.env.PORT || 3002
    app.listen(port, () => {
      console.log(`Servidor corriendo en el puerto ${port}`)
      console.log('CORS habilitado para desarrollo')
    })
  } catch (error) {
    console.error('Error al iniciar el servidor:', error)
    process.exit(1)
  }
}

// Iniciar la aplicación
initializeApp()
