import {CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor} from '@nestjs/common';
import {catchError, map, Observable, throwError} from 'rxjs';
interface  Response<T> {
  data: T
}
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>>{
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    // @ts-ignore
      return next.handle().pipe(
        map((data) =>  this.responseHandler(data, context)),
        catchError((err: HttpException)=> throwError(() =>  this.errorHandler(err, context)))
    )
  }

  private responseHandler(data: unknown, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const  request = ctx.getRequest();

    const  statusCode = response.statusCode;
    response.json(
        {
          status: true,
          path: request.url,
          statusCode,
          result: data
        }
    )
  }

  private errorHandler(err: HttpException, context: ExecutionContext) {
       const ctx = context.switchToHttp();
       const response = ctx.getResponse();
       const  request = ctx.getRequest();

       const status = err instanceof HttpException ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

       response.status(status).json({
          status: false,
          statusCode: status,
          path: request.url,
          message: err.message,
          result: err
       })
  }
}
