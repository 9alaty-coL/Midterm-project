import { Account } from 'src/models/account';
import { AccountDto } from '../dtos/account-dto';
import { IMapperToDto } from './mappers';

class AccountMapper implements IMapperToDto<AccountDto, Account> {
  public toDto(data: Account): AccountDto {
    return {
      email: data.email,
      password: data.password,
    }
  }
}

export const accountMapper = new AccountMapper();