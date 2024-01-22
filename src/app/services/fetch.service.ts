import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  constructor(private _httpClient: HttpClient) {}

  public get<T>(url: string): Observable<T> {
    return this._httpClient.get<T>(url);
  }

}
