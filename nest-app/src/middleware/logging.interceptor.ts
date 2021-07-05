import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  // Logger,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const { method, originalUrl, params, query, body } = req;
    const { statusCode } = res;

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            'info',
            `${method} ${originalUrl} ${statusCode} params: ${JSON.stringify(
              params,
            )} query: ${JSON.stringify(query)} body: ${JSON.stringify(body)} ${
              Date.now() - now
            }ms`,
          ),
        ),
      );
    // return next
    //   .handle()
    //   .pipe(
    //     tap(() =>
    //       Logger.log(
    //         `${method} ${originalUrl} ${statusCode} params: ${JSON.stringify(
    //           params,
    //         )} query: ${JSON.stringify(query)} body: ${JSON.stringify(body)} ${
    //           Date.now() - now
    //         }ms`,
    //       ),
    //     ),
    //   );
  }
}
// function WINSTON_MODULE_PROVIDER(WINSTON_MODULE_PROVIDER: any) {
//   throw new Error('Function not implemented.');
// }
