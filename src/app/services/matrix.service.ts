import { Inject, Injectable } from '@angular/core';
import { ControlDto, Matrix, MatrixDto } from '@types';
import { MapService, ControlService } from '@services';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import { TOKENS, TOKENS_TYPE } from 'app/tokens';

@Injectable({
  providedIn: 'root',
})
export class MatrixService {
  data: Matrix | null = null;
  dataDto: MatrixDto | null = null;

  constructor(
    private map: MapService,
    private http: HttpClient,
    private control: ControlService,
    @Inject(TOKENS) private tokens: TOKENS_TYPE
  ) {}

  onInit = (data: Data): ControlDto[] => {
    const matrixDto = data['matrix'].data as MatrixDto;
    this.set(matrixDto);
    return matrixDto.controls;
  };

  fetch(page: string | null) {
    return this.http.get<MatrixDto>(
      `${this.tokens.matrixApi}?&matrixId=${this.tokens.matrixId}&page=${page}`
    );
  }

  private set(matrixDto: MatrixDto): void {
    const control = this.control.findDto('Matrix', matrixDto.controls);
    if (!control) return;
    this.data = this.map.toMatrix(matrixDto);
    this.dataDto = matrixDto;
  }
}
