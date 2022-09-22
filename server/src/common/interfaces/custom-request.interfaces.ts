import { Request } from 'express';
import { DecryptedToken } from './user.interfaces';

export interface CustomRequest extends Request {
  user: DecryptedToken;
}
