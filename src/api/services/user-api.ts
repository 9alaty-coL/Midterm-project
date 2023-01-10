import { UpdateAccount } from 'src/models/account';
import { User } from 'src/models/user';

import { http } from '..';
import { IData } from '../dtos/data-dto';
import { UserDto } from '../dtos/user-dto';
import { AccountMapper } from '../mappers/account.mapper';
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

  export async function updateUserInfo(userId: User['id'], accountData: UpdateAccount): Promise<User> {
    const { data } = await http.put<IData<{ updatedUser: UserDto}>>('/api/user/updateInfo',
    {
      userId: userId,
      ...AccountMapper.getInstance().toUpdateAccountDto(accountData),
    });
    return userMapper.fromDto(data.data.updatedUser);
  }

  export async function updatePassword(password: string, token: string, userId: string): Promise<string> {
    const { data } = await http.patch<string>(USER_ROUTE + '/' + 'resetPassword', {
      token,
      userId,
      password,
    })

    return data;
  }
}
