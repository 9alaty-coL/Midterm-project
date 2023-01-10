import { Group } from 'src/models/group';
import { GroupDto } from '../dtos/group-dto';
import { IMapperFromDto } from './mappers';

/** Group mapper. */
export class GroupMapper implements IMapperFromDto<GroupDto, Group> {
  private static instance: GroupMapper;
  /** @inheritdoc */
  public fromDto(dto: GroupDto): Group {
    return {
      id: dto._id,
      name: dto.name,
      image: dto.image,
      ownerId: dto.owner_id,
      coOwnerId: dto.co_owner_id,
      memberId: dto.member_id,
    };
  }

  public static getInstance(): GroupMapper {
    if (!GroupMapper.instance) {
        GroupMapper.instance = new GroupMapper();
    }
    return GroupMapper.instance;
  }
}
