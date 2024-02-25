import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ResponseDto<T> {
  result: T;
  errorMessage: null | string;
  status: number;
}

export interface RequestDto<T> {
  data: T;
  accessToken: string;
}

export interface QueryParams {
  userId: string;
  [key: string]: string | number;
}

export enum API {
  Users = 'Users',
  Products = 'Products',
  Auth = 'Auth'
}

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  private _baseUrl = 'https://localhost:7001/api/';

  constructor(private _httpClient: HttpClient) {}

  public get<T>(url: API, params?: QueryParams): Observable<ResponseDto<T>> {
    return this._httpClient.get<ResponseDto<T>>(this._url(url), { params });
  }

  public post<T>(url: API, data: RequestDto<T>): Observable<ResponseDto<T>> {
    return this._httpClient.post<ResponseDto<T>>(this._url(url), data);
  }

  public put<T>(url: API, data: RequestDto<T>): Observable<ResponseDto<T>> {
    return this._httpClient.put<ResponseDto<T>>(this._url(url), data);
  }

  public delete<T>(url: API, params: QueryParams): Observable<ResponseDto<T>> {
    return this._httpClient.delete<ResponseDto<T>>(this._url(url), { params });
  }

  private _url(url: API): string {
    return this._baseUrl + url;
  }
}
