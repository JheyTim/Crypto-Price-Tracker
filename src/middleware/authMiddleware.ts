import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || '';

export const authenticate = (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, decoded: any) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token.' });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Authorization header missing.' });
  }
};
