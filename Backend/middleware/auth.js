const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication failed: Token missing or invalid' });
    }
    console.log("Error here1.");
    // Extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1];
    console.log("Error here2.");
    const decodedToken = jwt.verify(token, "1234");
    req.userData = { vendorId: decodedToken.vendorId, role: decodedToken.role };
    console.log("Error here3.");
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
