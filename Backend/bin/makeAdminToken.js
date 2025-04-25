// bin/makeAdminToken.js
require('dotenv').config();
const jwt = require('jsonwebtoken');

const payload = {
  userId: '000000000000000000000000',  // any dummy ObjectId
  role: 'admin'
};

const token = jwt.sign(
  payload,
  process.env.JWT_SECRET,   // must match the same secret your server uses
  { expiresIn: '2h' }
);

console.log(token);
