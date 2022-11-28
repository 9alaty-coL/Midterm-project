import { User } from 'src/models/user';

import { UserDto } from '../dtos/user-dto';
import { accountMapper } from './account.mapper';

import { IMapperFromDto } from './mappers';

/** User mapper. */
class UserMapper implements IMapperFromDto<UserDto, User> {
  /** @inheritdoc */
  public fromDto(dto: UserDto): User {
    return {
      id: dto._id,
      avatar: dto.avatar,
      ...accountMapper.fromRegisterAccountDto(dto),
    }
  }
}

export const userMapper = new UserMapper();
