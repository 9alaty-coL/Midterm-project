import { Token } from 'src/models/token';
import { TokenDto } from '../dtos/token-dto';
import { IMapperFromDto } from './mappers';

class TokenMapper implements IMapperFromDto<TokenDto, Token> {
  fromDto(dto: TokenDto): Token {
    return {
      accessToken: dto.accessToken,
    }
  }
}

export const tokenMapper = new TokenMapper();