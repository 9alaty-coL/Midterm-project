import { Account, RegisterAccount } from 'src/models/account';
import { Token } from 'src/models/token';

import { http } from '..';
import { IData } from '../dtos/data-dto';
import { TokenDto } from '../dtos/token-dto';
import { AccountMapper } from '../mappers/account.mapper';
import { tokenMapper } from '../mappers/token.mapper';

const LOGIN_ROUTE = 'api/auth/signin/';
const LOGIN_GOOGLE_ROUTE = 'api/auth/signin/google/'
const REGISTER_ROUTE = 'api/auth/signup/';
const RESET_PASSWORD_ROUTE = 'api/auth/resetpassword/';
const REGISTER_GOOGLE_ROUTE = 'api/auth/signin/google/'

/** Auth API. */
export namespace AuthApi {
  /**
   * Logs a user in with email and password.
   * @param account Account data.
   */
  export async function login(account: Account): Promise<Token> {
    const { data } = await http.post(
      LOGIN_ROUTE,
      AccountMapper.getInstance().toDto(account)
    );

    const { data: tokenDto } = data;
    return tokenMapper.fromDto(tokenDto);
  }

  export async function googleLogin(credential: string): Promise<Token> {
    const { data } = await http.post(
      LOGIN_GOOGLE_ROUTE,
      { credential }
    );

    const { data: tokenDto } = data;
    return tokenMapper.fromDto(tokenDto);
  }

  export async function register(account: RegisterAccount): Promise<string> {
    const { data } = await http.post(
      REGISTER_ROUTE,
      AccountMapper.getInstance().toRegisterAccountDto(account)
    );

    const { message } = data;
    return message;
  }

  export async function registerGoogle(token: string): Promise<string> {
    const { data } = await http.post(
      REGISTER_GOOGLE_ROUTE,
      token
    );

    const { message } = data;
    return message;
  }

  /** Logs the current user out. */
  export function logout(): Promise<void> {
    return Promise.resolve();
  }

  export async function resetPassword(email: string): Promise<string> {
    const { data } = await http.post<{message: string}>(RESET_PASSWORD_ROUTE, {email})
    return data.message;
  }
}
