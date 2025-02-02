import { getCurrentDateTimeISO } from '../helpers/dateTimeHelper.js'

const lockinMiddleware = (req, res, next) => {
  const { lockUntil, isLocked } = req.user
  const now = getCurrentDateTimeISO()

  if (!isLocked && lockUntil < now) {
    console.log('User is not locked')
    return res.status(401).json({ message: 'User is locked' })
  } else if (isLocked && lockUntil > now) {
    console.log('User is locked')
    return res.status(401).json({ message: 'User is locked' })
  }

  next()
}

export default lockinMiddleware
