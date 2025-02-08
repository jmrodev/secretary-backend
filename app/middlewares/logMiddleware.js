import chalk from 'chalk'
const logMiddleware = (req, res, next) => {
  console.log(chalk.blue(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`))

  console.log(chalk.green('Datos de la solicitud:'))
  console.table({
    Cuerpo: req.body,
    Consulta: req.query,
    Parámetros: req.params
  })

  next()
}

export default logMiddleware
