const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Accesso negato. Nessun token fornito.' });
  }

  try {
    const decoded = jwt.verify(token, 'secret'); // Usa il tuo segreto
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token non valido.' });
  }
};

module.exports = authenticate;