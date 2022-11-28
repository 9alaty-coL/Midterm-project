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
}
