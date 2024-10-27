const jwt = require('jsonwebtoken');

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Obtener el header Authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1]; // El token debe estar en el formato 'Bearer TOKEN'

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, token no válido' });
  }

  try {
    const verified = jwt.verify(token, 'your_secret_key'); // Verificar el token con la clave secreta
    req.user = verified; // Añadir los datos del usuario al request
    next(); // Continuar al siguiente middleware o ruta
  } catch (err) {
    return res.status(401).json({ message: 'Token no válido' });
  }
};

module.exports = authMiddleware;
