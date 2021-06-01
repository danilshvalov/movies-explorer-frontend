import ApiError from '../errors/ApiError';
import {HTTPMethod} from '../types/types';

/**
 * Интерфейс данных для создания запроса
 * */
interface SendRequestData {
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
interface InitApiData {
  /** URL, на который будет отправляться запрос */
  baseUrl: string;
  /** Включаемые header'ы */
  defaultHeaders?: Headers;
}

/** Базовый класс для API */
class Api {
  protected readonly baseUrl: InitApiData['baseUrl'];

  protected readonly defaultHeaders: InitApiData['defaultHeaders'];

  constructor({baseUrl, defaultHeaders = new Headers()}: InitApiData) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
  }

  /** Формирует и отправляет запрос */
  protected sendRequest({path, method, body}: SendRequestData) {
    return fetch(new URL(path, this.baseUrl).toString(), {
      method,
      headers: this.defaultHeaders,
      body,
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        new ApiError(
          `Запрос ${Object({
            path,
            method,
            body,
          }).toString()} завершился неудачно`,
          res.status,
        ),
      );
    });
  }
}

export default Api;
