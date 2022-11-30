import { User } from 'src/models/user';

import { http } from '..';
import { IData } from '../dtos/data-dto';
import { UserDto } from '../dtos/user-dto';
import { userMapper } from '../mappers/user.mapper';

const USER_ROUTE = '/api/user';

export namespace UserApiService {

  export async function fetchUserById(id: User['id']): Promise<User> {
    const { data } = await http.get<IData<{ user: UserDto}>>(`${USER_ROUTE}/${id}`);
    return userMapper.fromDto(data.data.user);
  }

  export async function fetchProfile(): Promise<User> {
    const { data } = await http.get<IData<{ user: UserDto }>>(USER_ROUTE + '/me');
    return userMapper.fromDto(data.data.user);
  }

  export async function sendInvitation(email: string, groupId: string): Promise<void> {
    try {
      await http.post(
        '/api/group/send',
        {
          groupId,
          email,
        }
      )
    } catch (error) {
      throw(error)
    }

  }
}
