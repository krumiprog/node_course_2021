import config from '../common/config';
import jwt from 'jsonwebtoken';
import { IToken } from '../types/types';

export const generateToken = (payload: IToken): string => {
  return jwt.sign(payload, config.JWT_SECRET_KEY as string, {
    expiresIn: '1h',
  });
};
