import { Inject, Injectable } from '@angular/core';
import { Matrix, MatrixDto, ResponseDto } from '@types';
import { MapService } from '@services';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import { TOKENS, TOKENS_TYPE } from 'app/tokens';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatrixService {
  dataDto: MatrixDto | null = null;
  data: Matrix | null = null;

  constructor(
    private map: MapService,
    private http: HttpClient,
    @Inject(TOKENS) private tokens: TOKENS_TYPE
  ) {}

  onInit = ({ data }: ResponseDto): void => {
    this.dataDto = data;
    this.data = this.map.toMatrix(data);
  };

  get fetch(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(
      `${this.tokens.matrixApi}?&matrixId=${this.tokens.matrixId}`
    );
  }
}
