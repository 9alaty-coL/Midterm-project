import { Account, RegisterAccount } from 'src/models/account';
import { Token } from 'src/models/token';

import { http } from '..';
import { TokenDto } from '../dtos/token-dto';
import { accountMapper } from '../mappers/account.mapper';
import { tokenMapper } from '../mappers/token.mapper';

const LOGIN_ROUTE = 'api/auth/signin/';
const REGISTER_ROUTE = 'api/auth/signup/';

/** Auth API. */
export namespace AuthApi {
  /**
   * Logs a user in with email and password.
   * @param account Account data.
   */
  export async function login(account: Account): Promise<Token> {
    const { data } = await http.post(
      LOGIN_ROUTE,
      accountMapper.toDto(account)
    );

    const { data: tokenDto } = data;
    return tokenMapper.fromDto(tokenDto);
  }

  export async function register(account: RegisterAccount): Promise<string> {
    const { data } = await http.post(
      REGISTER_ROUTE,
      accountMapper.toRegisterAccountDto(account)
    );

    const { message } = data;
    return message;
  }

  /** Logs the current user out. */
  export function logout(): Promise<void> {
    return Promise.resolve();
  }
}
