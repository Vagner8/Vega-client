import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControlDto, FractalDto } from '@types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  private id = '927d3af1-3053-4bb4-84eb-258b74c2052a';
  private api = 'https://localhost:7002/api/';
  private fractalApi = `${this.api}fractal`;
  private controlApi = `${this.api}control`;

  constructor(private http: HttpClient) {}

  get control() {
    return {
      add: (dto: ControlDto): Observable<ControlDto> => {
        return this.http.post<ControlDto>(this.controlApi, dto);
      },

      update: (dto: ControlDto[]): Observable<ControlDto[]> => {
        return this.http.post<ControlDto[]>(this.controlApi, dto);
      },

      delete: (id: string): Observable<ControlDto> => {
        return this.http.delete<ControlDto>(`${this.controlApi}?id=${id}`);
      },
    };
  }

  get fractal() {
    return {
      get: (): Observable<FractalDto> => {
        return this.http.get<FractalDto>(`${this.fractalApi}?id=${this.id}`);
      },

      add: (fractal: FractalDto): Observable<FractalDto> => {
        return this.http.post<FractalDto>(this.fractalApi, fractal);
      },

      update: (dto: FractalDto): Observable<FractalDto> => {
        return this.http.put<FractalDto>(this.fractalApi, dto);
      },

      delete: (fractals: FractalDto[]): Observable<FractalDto[]> => {
        return this.http.delete<FractalDto[]>(this.fractalApi, { body: fractals });
      },
    };
  }
}
