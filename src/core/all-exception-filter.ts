import { HttpExceptionResponse } from './http-exception-reponse';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as fs from 'fs';

@Catch() //if we want to handle only  http error then we pass HttpError
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let status: HttpStatus;
    let errorMessage: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorReponse = exception.getResponse();
      errorMessage =
        (errorReponse as HttpExceptionResponse).error || exception.message;
    }

    const responseBody = {
      statusCode: status,
      message: errorMessage,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    this.writeLog(JSON.stringify(responseBody));

    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }

  private async writeLog(responseBody: string | Uint8Array) {
    fs.appendFile('error.log', responseBody, 'utf8', (err) => {
      if (err) throw err;
    });
  }
}
