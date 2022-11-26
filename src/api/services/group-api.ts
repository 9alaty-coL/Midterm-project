import { Group } from 'src/models/group';
import { http } from '..';
import { IData } from '../dtos/data-dto';
import { GroupDto } from '../dtos/group-dto';
import { groupMapper } from '../mappers/group.mapper';

const GROUP_ROUTE = 'api/group/all';

interface ListGroupDto {
  readonly groups: readonly GroupDto[];
}

export namespace GroupApiService {
  export async function getGroups(): Promise<Group[]> {
    const { data } = await http.get<IData<ListGroupDto>>(GROUP_ROUTE);
    return data.data.groups.map(groupDto => groupMapper.fromDto(groupDto));
  }
}
