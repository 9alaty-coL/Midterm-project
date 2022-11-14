import { Post } from 'src/models/post';

import { http } from '..';
import { PostDto } from '../dtos/post-dto';
import { postMapper } from '../mappers/post.mapper';

// TODO (template preparation): This service was made for template. Remove it from your project.
export namespace PostApiService {

  /**
   * Fetches a list of posts.
   * @param signal AbortController signal.
   */
  export async function fetchPosts(signal: AbortSignal): Promise<Post[]> {
    // Read more about Axios http requests cancellation here: https://axios-http.com/docs/cancellation
    const { data } = await http.get<PostDto[]>('https://jsonplaceholder.typicode.com/posts', {
      signal,
    });

    return data.map(dto => postMapper.fromDto(dto));
  }
}
