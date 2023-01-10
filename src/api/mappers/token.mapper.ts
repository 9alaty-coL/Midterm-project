import { Token } from 'src/models/token';
import { TokenDto } from '../dtos/token-dto';
import { IMapperFromDto } from './mappers';

export class TokenMapper implements IMapperFromDto<TokenDto, Token> {
  private static instance: TokenMapper;
  fromDto(dto: TokenDto): Token {
    return {
      accessToken: dto.accessToken,
    }
  }
  public static getInstance(): TokenMapper {
    if (!TokenMapper.instance) {
        TokenMapper.instance = new TokenMapper();
    }
    return TokenMapper.instance;
  }
}
