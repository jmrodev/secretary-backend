import jwt from 'jsonwebtoken'

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(403).send({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export default validateToken
