import { IToken } from './types/types';

declare global {
  namespace Express {
    interface Request {
      user?: IToken;
    }
  }
}
