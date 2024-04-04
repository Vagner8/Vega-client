import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import {
  MatrixApi,
  TableDto,
  ResponseDto,
  RouteParam,
} from '@types';
import { of } from 'rxjs';
import { TableService } from './table.service';

export class ResolveService {
  static responseDto: ResolveFn<ResponseDto<TableDto[]> | null> = (
    route: ActivatedRouteSnapshot
  ) => {
    const page = route.paramMap.get(RouteParam.First) || '';
    const entityDtoCache = inject(TableService).get(page);
    if (entityDtoCache)
      return of({ data: entityDtoCache, success: true, error: '' });
    return inject(HttpClient).get<ResponseDto<TableDto[]>>(MatrixApi.Many);
  };
}
