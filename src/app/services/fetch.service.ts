import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl, QueryParams, ResponseDto } from '@types';
import { Observable } from 'rxjs';

export interface RequestDto<T> {
  data: T;
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  constructor(private _httpClient: HttpClient) {}

  public get<T>(url: ApiUrl, params?: QueryParams): Observable<ResponseDto<T>> {
    return this._httpClient.get<ResponseDto<T>>(url, { params });
  }

  public post<T>(url: ApiUrl, data: object): Observable<ResponseDto<T>> {
    return this._httpClient.post<ResponseDto<T>>(url, data);
  }

  public put<T>(url: ApiUrl, data: RequestDto<T>): Observable<ResponseDto<T>> {
    return this._httpClient.put<ResponseDto<T>>(url, data);
  }

  public delete<T>(url: ApiUrl, params: QueryParams): Observable<ResponseDto<T>> {
    return this._httpClient.delete<ResponseDto<T>>(url, { params });
  }
}
