import config from '../common/config';
import jwt from 'jsonwebtoken';
import { IToken } from '../types/types';

export const validateToken = (token: string): IToken | null => {
  const decoded = jwt.verify(token, config.JWT_SECRET_KEY as string);
  return decoded ? (decoded as IToken) : null;
};
