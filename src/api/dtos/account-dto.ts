import { string } from 'yup/lib/locale'

export interface AccountDto {

  /** Email dto. */
  email: string;

  /** Password dto. */
  password: string;
}