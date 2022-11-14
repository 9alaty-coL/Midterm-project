import { AxiosError } from 'axios';
import { User } from 'src/models/user';

import { http } from '..';
import { UserDto } from '../dtos/user-dto';
import { userMapper } from '../mappers/user.mapper';

// TODO (template preparation): This service was made for template. Remove it from your project.
/**
 * Mocks user login.
 * @param email Email.
 * @param password Password.
 */
async function mockLogin(email: string, password: string): Promise<UserDto> {
  try {
    return await http.post('login', {
      email, password,
    });
  } catch (error: unknown) {
    const axiosMockError = error as AxiosError;
    if (!email) {
      axiosMockError.message = 'No login provided';
      throw axiosMockError;
    }

    if (!password || password.length < 5) {
      axiosMockError.message = 'Incorrect password';
      throw axiosMockError;
    }

    return {
      id: 1,
      name: 'Test User',
      email,
    };
  }
}

/** Auth API. */
export namespace AuthApi {

  /**
   * Logs a user in with email and password.
   * @param email Email.
   * @param password Password.
   */
  export async function login(email: string, password: string): Promise<User> {
    const userDto = await mockLogin(email, password);
    const user = userMapper.fromDto(userDto);

    return user;
  }

  /** Logs the current user out. */
  export function logout(): Promise<void> {
    return Promise.resolve();
  }
}
