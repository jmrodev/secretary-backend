const httpError = (res, err) => {
  console.error(err)

  if (res.headersSent) {
    return
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0]
    res.status(400).json({
      success: false,
      message: `Error de clave duplicada: ${field} ya existe.`
    })
  } else if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(el => el.message)
    res.status(400).json({
      success: false,
      message: errors
    })
  } else if (err.name === 'CastError') {
    res.status(400).json({
      success: false,
      message: `Error de validación: ${err.path} no es un ${err.kind}`
    })
  } else if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      success: false,
      message: 'Token inválido'
    })
  } else if (err.name === 'TokenExpiredError') {
    res.status(401).json({
      success: false,
      message: 'Token expirado'
    })
  } else if (err.message === 'User not found') {
    res.status(404).json({
      success: false,
      message: 'Usuario no encontrado'
    })
  } else {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    })
  }
}

export default httpError
