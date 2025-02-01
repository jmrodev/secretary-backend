import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const validateToken = (req, res, next) => {
  console.log('Validating token')

  const secretKey = process.env.SECRET_KEY
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' })
    }
    req.userId = decoded.id
    next()
  })

  console.log('Token:', token)
  next()
}

export default validateToken
