import { RegisterAccountDto } from './account-dto';

/** User DTO. */
export interface UserDto extends RegisterAccountDto {
  _id: string,
  avatar: string,
}
