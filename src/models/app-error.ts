/**
 * Entity validation errors type.
 * Describes validation items for target entity.
 */
export type EntityValidationErrors<T> = {

  /** Error message for certain entity property. */
  [P in keyof T]?: PropValidationMessage<T[P]> | string;
};

/**
 * Validation message type for specific property type.
 * Could be a just error message for simple field or nested validation error for composite fields.
 */
export type PropValidationMessage<T> = T extends unknown[] ?
  string : T extends object ? EntityValidationErrors<T> : string;

/** Common application error. */
export class AppError extends Error {
  /** Error message. */
  public override readonly message: string;

  public constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export type AppValidationErrorData<TEntity> = EntityValidationErrors<TEntity> | EntityValidationErrors<TEntity>[];

/** Application validation error for certain entity. */
export class AppValidationError<TEntity extends object> extends AppError {
  /** Validation errors for entity fields. */
  public readonly validationData: AppValidationErrorData<TEntity>;

  public constructor(message: string, validationData: AppValidationErrorData<TEntity>) {
    super(message);
    this.validationData = validationData;
  }
}
