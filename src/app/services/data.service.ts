import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '@constants';
import { FractalDto } from '@types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private id = ENV.ID;
  private api = ENV.API;
  private fractalApi = `${this.api}fractal`;

  constructor(private http: HttpClient) {}

  get(): Observable<FractalDto> {
    return this.http.get<FractalDto>(`${this.fractalApi}?id=${this.id}`);
  }

  add(fractal: FractalDto[]): Observable<FractalDto> {
    return this.http.post<FractalDto>(this.fractalApi, fractal);
  }

  update(dto: FractalDto[]): Observable<FractalDto> {
    return this.http.put<FractalDto>(this.fractalApi, dto);
  }

  delete(fractals: FractalDto[]): Observable<FractalDto[]> {
    return this.http.delete<FractalDto[]>(this.fractalApi, {
      body: fractals,
    });
  }
}
