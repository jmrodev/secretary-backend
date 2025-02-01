import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pathRouter = __dirname

const removeExtension = (file) => file.split('.').slice(0, -1).join('.')

const loadRoutes = async () => {
  const files = fs.readdirSync(pathRouter).filter((file) => {
    const fileWithoutExt = removeExtension(file)
    return fileWithoutExt !== 'index'
  })

  for (const file of files) {
    const fileWithoutExt = removeExtension(file).replace('Router', '')
    try {
      const module = await import(`file://${pathRouter}/${file}`)
      if (module.default) {
        router.use(`/${fileWithoutExt}`, module.default)
        console.log(`Ruta cargada: /${fileWithoutExt}`)
      }
    } catch (err) {
      console.error(`Error cargando la ruta /${fileWithoutExt}:`, err)
    }
  }
}

await loadRoutes()

router.get('*', (req, res) => {
  console.warn(`404 Not Found: ${req.method} ${req.url}`)
  res.status(404).send({ message: 'Not Found' })
})

export default router
