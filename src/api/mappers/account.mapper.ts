import { Account, RegisterAccount } from 'src/models/account';
import { AccountDto, RegisterAccountDto } from '../dtos/account-dto';
import { IMapperToDto } from './mappers';

class AccountMapper implements IMapperToDto<AccountDto, Account> {
  public toDto(data: Account): AccountDto {
    return {
      email: data.email,
      password: data.password,
    }
  }

  public toRegisterAccountDto(data: RegisterAccount): RegisterAccountDto {
    return {
      email: data.email,
      password: data.password,
      yearOfBirth: data.yearOfBirth,
      firstname: data.firstName,
      lastname: data.lastName,
      address: data.address,
    }
  }
}

export const accountMapper = new AccountMapper();