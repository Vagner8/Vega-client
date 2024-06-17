import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnitDto } from '@types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnitHttpService {
  private api = 'https://localhost:7002/api/unit';

  constructor(private http: HttpClient) {}

  get(id: string): Observable<UnitDto> {
    return this.http.get<UnitDto>(`${this.api}?id=${id}`);
  }

  add(unit: UnitDto): Observable<UnitDto> {
    return this.http.post<UnitDto>(this.api, unit);
  }

  delete(id: string): Observable<UnitDto> {
    return this.http.delete<UnitDto>(`${this.api}?id=${id}`);
  }
}
