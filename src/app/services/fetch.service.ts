import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControlDto, UnitDto } from '@types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  private id = '2b22ee97-76f6-48a3-a711-7f66c55e60a9';
  private api = 'https://localhost:7002/api/';
  private unitApi = `${this.api}unit`;
  private controlApi = `${this.api}control`;

  constructor(private http: HttpClient) {}

  get control() {
    return {
      add: (dto: ControlDto): Observable<ControlDto> => {
        return this.http.post<ControlDto>(this.controlApi, dto);
      },

      update: (dto: ControlDto): Observable<ControlDto> => {
        return this.http.post<ControlDto>(this.controlApi, dto);
      },

      delete: (id: string): Observable<ControlDto> => {
        return this.http.delete<ControlDto>(`${this.controlApi}?id=${id}`);
      },
    };
  }

  get unit() {
    return {
      get: (): Observable<UnitDto> => {
        return this.http.get<UnitDto>(`${this.unitApi}?id=${this.id}`);
      },

      add: (unit: UnitDto): Observable<UnitDto> => {
        return this.http.post<UnitDto>(this.unitApi, unit);
      },

      delete: (id: string): Observable<UnitDto> => {
        return this.http.delete<UnitDto>(`${this.unitApi}?id=${id}`);
      },
    };
  }
}
