import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Adjust as needed for your use case
    }
  }
}
