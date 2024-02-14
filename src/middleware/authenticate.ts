import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY!;

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const cookieHeader = req.headers.cookie;
  const cookies: { [key: string]: string } = {};

  cookieHeader?.split(';').forEach(cookie => {
    const [name, value] = cookie.split('=').map(c => c.trim());
    cookies[name] = value;
  });
  const token = cookies.sid;

  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export default authenticate;