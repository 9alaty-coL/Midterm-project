import { Post } from 'src/models/post';

import { PostDto } from '../dtos/post-dto';

import { IMapperFromDto } from './mappers';

/** Post mapper. */
export class PostMapper implements IMapperFromDto<PostDto, Post> {
  private static instance: PostMapper
  /** @inheritdoc */
  public fromDto(dto: PostDto): Post {
    return new Post({
      id: dto.id,
      userId: dto.userId,
      title: dto.title,
      body: dto.body,
    });
  }
  public static getInstance(): PostMapper {
    if (!PostMapper.instance) {
        PostMapper.instance = new PostMapper();
    }
    return PostMapper.instance;
  }
}
