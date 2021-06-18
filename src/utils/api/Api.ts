import {INTERNAL_SERVER} from '@texts/api';
import {HTTPMethod} from '@types-src/types';
import ApiError from '@errors/ApiError';

/**
 * Интерфейс данных для создания запроса
 * */
export interface SendRequestData {
  /** Путь запроса */
  path: string;
  /** HTTP метод */
  method: HTTPMethod;
  headers?: Headers;
  /** Содержимое */
  body?: string;
}

/**
 * Интерфейс данных для создания API
 * */
export interface InitApiData {
  /** URL, на который будет отправляться запрос */
  baseUrl: string;
  /** Включаемые header'ы */
  defaultHeaders?: HeadersInit;
  settings?: RequestInit;
}

function errorParser(err: Error) {
  if (err instanceof ApiError) {
    throw err;
  }
  const {message, status} = INTERNAL_SERVER;
  throw new ApiError(message, status);
}

/** Базовый класс для API */
class Api {
  protected readonly baseUrl: string;

  protected readonly defaultHeaders: HeadersInit;

  protected readonly settings: RequestInit | undefined;

  constructor({
    baseUrl,
    defaultHeaders = new Headers(),
    settings,
  }: InitApiData) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
    this.settings = settings;
  }

  /** Формирует и отправляет запрос */
  protected sendRequest({
    path,
    method,
    body,
  }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SendRequestData): Promise<any> {
    return fetch(new URL(path, this.baseUrl).href, {
      ...this.settings,
      method,
      headers: this.defaultHeaders,
      body,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then((errBody) => {
          throw new ApiError(errBody.message, res.status);
        });
      })
      .catch(errorParser);
  }
}
export default Api;
