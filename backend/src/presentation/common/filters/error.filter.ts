import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { ConflictError, NotFoundError } from '@app/application';
import { DomainError } from '@app/domain';

const statusFor = (error: unknown): number => {
  if (error instanceof HttpException) return error.getStatus();
  if (error instanceof NotFoundError) return HttpStatus.NOT_FOUND;
  if (error instanceof ConflictError) return HttpStatus.CONFLICT;
  if (error instanceof DomainError) return HttpStatus.UNPROCESSABLE_ENTITY;
  return HttpStatus.INTERNAL_SERVER_ERROR;
};

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const status = statusFor(error);

    if (error instanceof HttpException) {
      response.status(status).json(error.getResponse());
      return;
    }

    const message =
      status === HttpStatus.INTERNAL_SERVER_ERROR || !(error instanceof Error)
        ? 'Internal server error'
        : error.message;
    response.status(status).json({ statusCode: status, message });
  }
}
