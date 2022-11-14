import { AxiosError } from 'axios';
import { AppError, AppValidationError, EntityValidationErrors } from 'src/models/app-error';

import { ValidationErrorMapper } from './mappers';

/**
 * Error mapper type declaration.
 * Could be a simple function to transform errors from DTO to errors of domain model
 * or implementation of IMapper with implemented validationErrorFromDto method.
 */
export type ErrorMapper<TDto, TModel extends object> = ValidationErrorMapper<TDto, TModel> |
ValidationErrorMapper<TDto, TModel>['validationErrorFromDto'];

/** App error mapper. */
export class AppErrorMapper {
  /**
   * Converts default HttpErrorResponse object to custom application error.
   * @param httpError Http error response.
   */
  public static fromDto(httpError: AxiosError): AppError {
    const { message } = httpError;
    return new AppError(message);
  }

  /**
   * Maps HTTP API error response to the appropriate API error model.
   * @param httpError HTTP error.
   * @param mapper Mapper function that transform validation DTO errors to the application validation model.
   * @returns AppError if httpError is not "Bad Request" error or AppValidationError if it is "Bad Request".
   */
  public static fromDtoWithValidationSupport<TErrorDto, TEntity extends object>(
    httpError: AxiosError<TErrorDto>,
    mapper: ErrorMapper<TErrorDto, TEntity>,
  ): AppError | AppValidationError<TEntity> {
    if (httpError.response?.status !== 400) {
      // It is not a validation error. Return simple AppError.
      return this.fromDto(httpError);
    }

    if (mapper == null) {
      throw new Error('Provide mapper for API errors.');
    }

    if (typeof mapper !== 'function' && mapper.validationErrorFromDto == null) {
      throw new Error('Provided mapper does not have implementation of validationErrorFromDto');
    }

    // TODO (template preparation):
    // Check that API sends you an error with the same field (detail, data, etc.) and change it if it's needed.

    // This is a validation error => create AppValidationError.
    const errorData = httpError.response.data;

    const mapperFunc = (data: TErrorDto): EntityValidationErrors<TEntity> => (typeof mapper === 'function' ?
      mapper(data) :
      mapper.validationErrorFromDto(data));

    const validationData = Array.isArray(errorData) ?
      errorData.map((item: TErrorDto) => mapperFunc(item)) as EntityValidationErrors<TEntity>[] :
      mapperFunc(errorData);

    return new AppValidationError<TEntity>(httpError.message, validationData);
  }
}
