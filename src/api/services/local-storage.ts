import { Answer, Slide } from 'src/models/slide';

/** Local storage service. */
export namespace LocalStorageService {
  const KEY = 'AUTH_TOKEN';
  const SLIDE_KEY = 'SLIDE_KEY'

  /**
   * Saves session token into local storage.
   * @param token Token.
   */
  export const setLocalStorage = (token?: string | null): void => {
    if (!token) {
      return localStorage.removeItem(KEY);
    }

    return localStorage.setItem(KEY, token);
  };

  /** Gets session token. */
  export const getSessionToken = () => localStorage.getItem(KEY);

  /** Remove session token. */
  export const removeSessionToken = () => localStorage.removeItem(KEY);

  export const getAnsweredSlideId = (): string[] => JSON.parse(localStorage.getItem(SLIDE_KEY) ?? '[]');

  export const saveAnsweredSlide = (id: Slide['id']) => {
    const answeredSlideIds = getAnsweredSlideId();
    if (answeredSlideIds.includes(id!)) {
      return;
    }
    localStorage.setItem(SLIDE_KEY, 
      JSON.stringify([...answeredSlideIds, id])
    )
  }
}
