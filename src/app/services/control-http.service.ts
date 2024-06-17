import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControlDto } from '@types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ControlHttpService {
  private api = 'https://localhost:7002/api/control';

  constructor(private http: HttpClient) {}

  add(dto: ControlDto): Observable<ControlDto> {
    return this.http.post<ControlDto>(this.api, dto);
  }

  update(dto: ControlDto): Observable<ControlDto> {
    return this.http.post<ControlDto>(this.api, dto);
  }

  delete(id: string): Observable<ControlDto> {
    return this.http.delete<ControlDto>(`${this.api}?id=${id}`);
  }
}
