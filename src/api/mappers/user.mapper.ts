import { User } from 'src/models/user';

import { UserDto } from '../dtos/user-dto';
import { AccountMapper } from './account.mapper';
import { groupMapper } from './group.mapper';

import { IMapperFromDto } from './mappers';

/** User mapper. */
class UserMapper implements IMapperFromDto<UserDto, User> {
  /** @inheritdoc */
  public fromDto(dto: UserDto): User {
    return {
      ...AccountMapper.getInstance().fromRegisterAccountDto(dto),
      id: dto._id,
      avatar: dto.avatar,
      owner: dto.roles.owner.map(groupDto => groupMapper.fromDto(groupDto)),
      co_owner: dto.roles.co_owner.map(groupDto => groupMapper.fromDto(groupDto)),
      member: dto.roles.member.map(groupDto => groupMapper.fromDto(groupDto)),
      unreadCount: dto.unread_count
    }
  }
}

export const userMapper = new UserMapper();
