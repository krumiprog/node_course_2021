import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  Logger,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
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
          Logger.log(
            `${method} ${originalUrl} ${statusCode} params: ${JSON.stringify(
              params,
            )} query: ${JSON.stringify(query)} body: ${JSON.stringify(body)} ${
              Date.now() - now
            }ms`,
          ),
        ),
      );
  }
}
