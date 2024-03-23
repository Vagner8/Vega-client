import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import {
  EntityApi,
  EntityDto,
  PageTapName,
  ResponseDto,
  RouteParam,
} from '@types';
import { of } from 'rxjs';
import { EntityService } from './entity.service';

export class ResolveService {
  static responseDto: ResolveFn<ResponseDto<EntityDto[]> | null> = (
    route: ActivatedRouteSnapshot
  ) => {
    const page = route.paramMap.get(RouteParam.First) || '';
    if (!page || page === PageTapName.Home) return of(null);
    const entityDtoCache = inject(EntityService).get(page);
    if (entityDtoCache)
      return of({ data: entityDtoCache, success: true, error: '' });
    return inject(HttpClient).get<ResponseDto<EntityDto[]>>(EntityApi.Many, {
      params: { page },
    });
  };
}
