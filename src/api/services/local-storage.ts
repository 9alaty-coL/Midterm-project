/** Local storage service. */
export namespace LocalStorageService {
  const KEY = '-=APP_NAME_TOKEN=-';

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
}
