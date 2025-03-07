import { PERMISSIONS, checkPermission } from '../../config/role.js'

const roleMiddleware = (resource, action) => {
  return (req, res, next) => {
    try {
      const user = req.user
      if (!user) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Usuario o rol no encontrado'
        })
      }

      const role = user.role
      if (!role) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Usuario o rol no encontrado'
        })
      }

      const hasPermission = checkPermission(role, resource, action)
      if (!hasPermission) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'No tiene permiso para realizar esta acción'
        })
      }

      req.audit = {
        ...req.audit,
        role: user.role,
        action,
        resource
      }

      next()
    } catch (error) {
      console.error('Error en autorización:', error)
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Error en la autorización'
      })
    }
  }
}

export default roleMiddleware
