import { IError } from './types';

export function isError(error: any): error is IError {
  return error instanceof Error;
}