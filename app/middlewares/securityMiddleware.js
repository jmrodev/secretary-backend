import helmet from 'helmet'
const securityMiddleware = () => {
  return [
    helmet(),
    (req, res, next) => {
      res.setHeader('X-Content-Type-Options', 'nosniff')
      res.setHeader('X-Frame-Options', 'DENY')
      res.setHeader('X-XSS-Protection', '1; mode=block')
      next()
    }
  ]
}
export default securityMiddleware
