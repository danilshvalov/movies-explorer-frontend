import {HTTPMethod} from '../../types/types';
import ApiError from '../../errors/ApiError';

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
  defaultHeaders?: Headers;
  settings?: RequestInit;
}

/** Базовый класс для API */
class Api {
  protected readonly baseUrl: InitApiData['baseUrl'];

  protected readonly defaultHeaders: InitApiData['defaultHeaders'];

  protected readonly settings?: RequestInit;

  constructor({baseUrl, defaultHeaders = new Headers(), settings}: InitApiData) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
    this.settings = settings;
  }

  /** Формирует и отправляет запрос */
  protected sendRequest({path, method, body}: SendRequestData) {
    console.log(new URL(path, this.baseUrl)?.href, method, body);
    return fetch(new URL(path, this.baseUrl).href, {
      ...this.settings,
      method,
      headers: this.defaultHeaders,
      body,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new ApiError(res);
    });
  }
}
export default Api;
