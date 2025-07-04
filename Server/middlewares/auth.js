import jwt from 'jsonwebtoken';
import 'dotenv/config';
import user from '../model/userModal.js';

export const protectedRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; 
    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ message: 'Token expired' });
    }

    const User = await user.findById(decoded.userId).select('-password');

    if (!User) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.User = User;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized', error: error.message });
  }
};
