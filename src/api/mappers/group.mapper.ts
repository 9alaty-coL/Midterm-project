import { Group } from 'src/models/group';
import { GroupDto } from '../dtos/group-dto';
import { IMapperFromDto } from './mappers';

/** Group mapper. */
class GroupMapper implements IMapperFromDto<GroupDto, Group> {
  /** @inheritdoc */
  public fromDto(dto: GroupDto): Group {
    return {
      id: dto._id,
      name: dto.name,
      image: dto.image,
    };
  }
}

export const groupMapper = new GroupMapper();
