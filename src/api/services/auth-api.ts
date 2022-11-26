import { Account } from 'src/models/account';
import { Token } from 'src/models/token';

import { http } from '..';
import { TokenDto } from '../dtos/token-dto';
import { accountMapper } from '../mappers/account.mapper';
import { tokenMapper } from '../mappers/token.mapper';

const AUTH_ROUTE = 'api/auth/signin/';

/** Auth API. */
export namespace AuthApi {
  /**
   * Logs a user in with email and password.
   * @param account Account data.
   */
  export async function login(account: Account): Promise<Token> {
    const { data } = await http.post(
      AUTH_ROUTE,
      accountMapper.toDto(account)
    );

    const { data: tokenDto } = data;
    return tokenMapper.fromDto(tokenDto);
  }

  /** Logs the current user out. */
  export function logout(): Promise<void> {
    return Promise.resolve();
  }
}
