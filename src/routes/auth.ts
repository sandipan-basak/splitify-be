import express, { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

import { authenticate, validateSignup } from '~/middleware/authenticate';
import { executeNeo4jQuery } from '~/utils/db';
import { refineWriteQueryParams } from '~/utils/query';

const authRouter = express.Router();
const secretKey = process.env.SECRET_KEY ?? '';

interface User {
  id: string
  username: string
  email: string
  password?: string
}

authRouter.post('/signup', validateSignup, async (req: {
  body: {
    username: string
    email: string
    phoneNumber?: string
    password: string
  }
}, res: Response) => {
  const { username, email, phoneNumber, password } = req.body;

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);

    const refinedQueryUtilObject = refineWriteQueryParams({
      username, email, phoneNumber, password: hashedPassword
    });

    const { records } = await executeNeo4jQuery(
      `MERGE (u:User ${refinedQueryUtilObject.queryParamString}) RETURN u`,
      refinedQueryUtilObject.validParams,
      { database: 'neo4j' }
    );

    const user: User = {
      ...records[0].get('u').properties,
      id: records[0].get('u').elementId
    };

    delete user.password;

    const accessToken = jwt.sign({ userId: user.id, username: user.username, email: user.email }, secretKey, { expiresIn: '7d' });

    res.cookie('sid', accessToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
      // secure: true, // Uncomment this in production (requires HTTPS)
      // sameSite: 'strict', // Adjust according to your cross-site request needs
    });

    res.json({ message: 'Signed up successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

authRouter.post('/login', async (req: {
  body: {
    username: string
    password: string
  }
}, res: Response) => {
  const { username, password } = req.body;

  try {
    const { records } = await executeNeo4jQuery(
      'MATCH (u:User WHERE u.username = $username) RETURN u',
      { username },
      { database: 'neo4j' }
    );

    if (records.length === 0) {
      return res.status(401).json({ message: "User doesn't exist" });
    }

    const user: User = {
      ...records[0].get('u').properties,
      id: records[0].get('u').elementId
    };

    if (typeof user.password !== 'string') {
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }

    const match = await bcryptjs.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const accessToken = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '7d' });

    res.cookie('sid', accessToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
      // secure: true, // Uncomment this in production (requires HTTPS)
      // sameSite: 'strict', // Adjust according to your cross-site request needs
    });

    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

authRouter.post('/logout', authenticate, (req: Request, res: Response) => {
  res.cookie('sid', '', { expires: new Date(0) });

  res.json({ message: 'Logged out successfully' });
});
export default authRouter;
