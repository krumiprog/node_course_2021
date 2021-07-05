import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// import { CONFIG } from '../common/config';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const now = Date.now();
    const { method, originalUrl, params, query, body } = request;

    response.on('finish', () => {
      const { statusCode } = response;

      const message = `${method} ${originalUrl} ${statusCode} params: ${JSON.stringify(
        params,
      )} query: ${JSON.stringify(query)} body: ${JSON.stringify(body)} ${
        Date.now() - now
      }ms`;

      this.logger.log(message);
    });

    next();
  }
}
