const logMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
}
export default logMiddleware
