require('dotenv').config()
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ','');
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;      // { userId, role }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
