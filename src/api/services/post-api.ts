import { Post } from 'src/models/post';

import { http } from '..';
import { PostDto } from '../dtos/post-dto';
import { PostMapper } from '../mappers/post.mapper';

// TODO (template preparation): This service was made for template. Remove it from your project.
export namespace PostApiService {

  /**
   * Fetches a list of posts.
   * @param signal AbortController signal.
   */
  export async function fetchPosts(): Promise<Post[]> {
    const { data } = await http.get<PostDto[]>('https://jsonplaceholder.typicode.com/posts');

    return data.map(dto => PostMapper.getInstance().fromDto(dto));
  }
}
