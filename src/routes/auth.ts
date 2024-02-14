import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

import { signupSchema } from '~/validator';
import authenticate from '~/middleware/authenticate';
import pool from '~/utils/db';

const authRouter = express.Router();
const secretKey = process.env.SECRET_KEY!;

const validateSignup = (req: Request, res: Response, next: NextFunction) => {
  const { error } = signupSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  next();
};

authRouter.post('/signup', validateSignup, async (req: {
  body: {
    username: string,
    email?: string,
    phone_number?: string,
    password: string,
  }
}, res: Response) => {
  const { username, email, phone_number, password } = req.body;
  
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, email, phone_number, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, phone_number, hashedPassword]
    );

    console.log('post pool init', result);

    const user = result.rows[0];
    delete user.password;

    const accessToken = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '7d' });

    res.cookie('sid', accessToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      // secure: true, // Uncomment this in production (requires HTTPS)
      // sameSite: 'strict', // Adjust according to your cross-site request needs
    });

    res.json({ message: "Signed up successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

authRouter.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const queryResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    
    if (queryResult.rows.length === 0) {
      return res.status(401).json({ message: "User doesn't exist" });
    }
    
    const user = queryResult.rows[0];
    
    const match = await bcryptjs.compare(password, user.password);
    
    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const accessToken = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '7d' });

    res.cookie('sid', accessToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      // secure: true, // Uncomment this in production (requires HTTPS)
      // sameSite: 'strict', // Adjust according to your cross-site request needs
    });
    
    res.json({ message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

authRouter.post('/logout', authenticate, (req, res) => {
  res.cookie('sid', '', { expires: new Date(0) });

  res.json({ message: "Logged out successfully" });
});
export default authRouter;