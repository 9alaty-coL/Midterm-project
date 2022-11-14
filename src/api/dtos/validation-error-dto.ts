// TODO (template preparation): Check and update ValidationErrorDto according to API specs.

/**
 * Validation error DTO.
 * If a property has primitive type (number, string), then errors - is an array of strings.
 * If a property is an object, then errors is an array of strings if property is null but required e.g.
 * Or is nested ValidationErrorDto<T> object.
 * If a property is an array, then errors is an object where key is name of property
 * and value is array of errors (index in this array corresponds to index of item in the original array).
 */
export type ValidationErrorDto<T> = {
  [P in keyof T]?: T[P] extends (infer K)[] ? ValidationErrorDto<K> :
    T[P] extends object ? ValidationErrorDto<T[P]> | string[] : string[];
} & {

  /** Non field errors. */
  readonly non_field_errors?: readonly string[];
};
