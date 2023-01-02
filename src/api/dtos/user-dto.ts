import { RegisterAccountDto } from './account-dto';
import { GroupDto } from './group-dto';

/** User DTO. */
export interface UserDto extends RegisterAccountDto {
  readonly _id: string,
  readonly avatar: string,
  readonly roles: {
    readonly owner: GroupDto[];
    readonly co_owner: GroupDto[];
    readonly member: GroupDto[];
  }
  unread_count?: number;
}
