import {HTTPMethod} from './types';
import {backendUrl} from './config';

interface SendRequestData {
  path: string;
  method?: HTTPMethod;
  headers?: Headers;
  body?: string;
}

interface InitApiData {
  baseUrl: string;
  defaultHeaders: Headers;
}

class MainApi {
  private readonly baseUrl: InitApiData['baseUrl'];

  private readonly defaultHeaders: InitApiData['defaultHeaders'];

  constructor({baseUrl, defaultHeaders}: InitApiData) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
  }

  sendRequest({
    path, method, headers, body,
  }: SendRequestData) {
    return fetch(new URL(path, this.baseUrl).toString(), {
      method,
      headers: {...this.defaultHeaders, ...headers},
      body,
      credentials: 'include',
    });
  }
}

const mainApi = new MainApi({
  baseUrl: backendUrl,
  defaultHeaders: new Headers(),
});

export default mainApi;
