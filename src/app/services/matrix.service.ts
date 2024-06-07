import { Inject, Injectable } from '@angular/core';
import { Matrix, MatrixDto, ResponseDto } from '@types';
import { MapService, TapService } from '@services';
import { HttpClient } from '@angular/common/http';
import { TOKENS, TOKENS_TYPE } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class MatrixService {
  dto: MatrixDto | null = null;
  data: Matrix | null = null;

  constructor(
    private tap: TapService,
    private map: MapService,
    private http: HttpClient,
    @Inject(TOKENS) private tokens: TOKENS_TYPE,
  ) {}

  onInit(): void {
    this.http.get<ResponseDto>(this.tokens.api).subscribe(this.set);
  }

  private set = ({ data }: ResponseDto): void => {
    this.dto = data;
    this.data = this.map.toMatrix(data);
    // this.data.groups.forEach(({ controls }) => this.tap.add(controls));
  };
}
