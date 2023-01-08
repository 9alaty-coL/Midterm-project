import { AxiosRequestConfig } from 'axios';
import { Group } from 'src/models/group';
import { http } from '..';
import { IData } from '../dtos/data-dto';
import { GroupDto } from '../dtos/group-dto';
import { groupMapper } from '../mappers/group.mapper';

const GROUP_ROUTE = 'api/group/all';

const ADD_USER_ROUTE = 'api/group/join';

const GROUP_DETAIL_ROUTE = 'api/group';

interface ListGroupDto {
  readonly groups: readonly GroupDto[];
}

export namespace GroupApiService {
  export async function getGroups(): Promise<Group[]> {
    const { data } = await http.get<IData<ListGroupDto>>(GROUP_ROUTE);
    return data.data.groups.map(groupDto => groupMapper.fromDto(groupDto));
  }

  export async function addUser(id: Group['id']): Promise<Group> {
    const { data: groupDto } = await http.get<GroupDto>(`${ADD_USER_ROUTE}/${id}`);
    return groupMapper.fromDto(groupDto);
  }

  export async function getGroupById(id: Group['id']): Promise<Group> {
    const { data } = await http.get<IData<{group: GroupDto}>>(`${GROUP_DETAIL_ROUTE}/${id}`);
    return groupMapper.fromDto(data.data.group);
  }

  export async function createGroup(name: string): Promise<void> {
    const { data } = await http.post(
      '/api/group/create',
      { name },
    )
    return;
  }

  export async function removeMember(memberId: string, groupId: string): Promise<void> {
    return  await http.patch(
      '/api/group/member/remove',
      {
        member_id: memberId,
        groupId,
      }
    )
  }

  export async function removeCoOwner(coOwnerId: string, groupId: string): Promise<void> {
    return  await http.patch(
      '/api/group/co_owner/remove',
      {
        co_owner_id: coOwnerId,
        groupId,
      }
    )
  }

  export async function assignMemberToCoOwner(memberId: string, groupId: string): Promise<void> {
    return await http.patch(
      '/api/group/member/toCoowner',
      {
        member_id: memberId,
        groupId,
      }
    )
  }

  export async function assignCoOwnerToMember(coOwnerId: string, groupId: string): Promise<void> {
    return await http.patch(
      '/api/group/co_owner/toMember',
      {
        co_owner_id: coOwnerId,
        groupId,
      }
    )
  }

  export async function deleteGroup(groupId: string): Promise<any> {
    const { data } = await http.delete(
      '/api/group/delete',
      {
          data: {
            groupId
          }
      })
    return data
  }
}
