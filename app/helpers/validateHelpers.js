import bcrypt from 'bcrypt';
import { getCurrentDateTimeISO, addMillisecondsToCurrentDateTime } from '../helpers/dateTimeHelper.js'

const validateUserCredentials = (req, res) => {
  const { userName, password } = req.body;

  if (!userName?.trim()) {
    return res.status(400).json({
      message: "El nombre de usuario es requerido",
      success: false,
    });
  }

  if (!password) {
    return res.status(400).json({
      message: "La contraseña es requerida",
      success: false,
    });
  }
};

const checkUserExistenceAndLockStatus = async (userName, res) => {
  const user = await getUserByUserName(userName);
  if (!user) {
    return res.status(401).json({
      message: "Usuario no encontrado",
      success: false,
    });
  }

  if (user.isLocked && user.lockUntil > getCurrentDateTimeISO()) {
    const waitMinutes = Math.ceil(
      (new Date(user.lockUntil) - new Date()) / 60000
    );
    return res.status(401).json({
      message: `Usuario bloqueado. Inténtelo nuevamente en ${waitMinutes} minutos.`,
      success: false,
      lockUntil: user.lockUntil,
    });
  }

  return user; // Return the user object if found and not locked
};

const verifyPassword = async (providedPassword, storedPassword, res) => {
  const isMatch = await bcrypt.compare(providedPassword, storedPassword);
  if (!isMatch) {
    
    const loginAttempts = (user.loginAttempts || 0) + 1
    const maxAttempts = 3
    const isLocked = loginAttempts >= maxAttempts
    const lockUntil = isLocked ? addMillisecondsToCurrentDateTime(300000) : null

    await updateUser(user._id, { loginAttempts, isLocked, lockUntil })

    if (isLocked) {
      return res.status(401).json({
        message: 'Demasiados intentos fallidos. Usuario bloqueado por 5 minutos.',
        success: false,
        lockUntil
      })
    }
    return res.status(401).json({
      message: "Usuario o contraseña incorrectos.",
      success: false,
    });
  }
  return true; // Return true if the password matches
};

export {
  checkUserExistenceAndLockStatus,
  validateUserCredentials,
  verifyPassword
}
