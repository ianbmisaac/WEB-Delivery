const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: true, message: 'Token requerido' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_no_usar_en_produccion_12345');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: true, message: 'Token inválido o expirado' });
  }
}

module.exports = { authenticate };