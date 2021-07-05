import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
// import { CONFIG } from '../common/config';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // private logger = new Logger('HTTP');

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

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

      this.logger.log('info', message);
    });

    next();
  }
}
// function WINSTON_MODULE_PROVIDER(WINSTON_MODULE_PROVIDER: any) {
//   throw new Error('Function not implemented.');
// }
