import { string } from 'yup/lib/locale'

export interface AccountDto {

  /** Email dto. */
  email: string;

  /** Password dto. */
  password: string;
}

export interface RegisterAccountDto extends AccountDto {
  readonly firstname: string;
  readonly lastname: string;
  readonly yearOfBirth: number;
  readonly address: string;
}