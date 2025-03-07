import { getCurrentDateTimeISO } from '../helpers/dateTimeHelper.js'

const lockinMiddleware = (req, res, next) => {
  const { lockUntil, isLocked } = req.user
  const now = getCurrentDateTimeISO()

  if (!isLocked && lockUntil < now) {
    return res.status(401).json({ message: 'User is locked' })
  } else if (isLocked && lockUntil > now) {
    return res.status(401).json({ message: 'User is locked' })
  }

  next()
}

export default lockinMiddleware
