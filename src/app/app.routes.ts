import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { ActionComponent, PageComponent } from '@components';
import { PageTypeName } from './types/tap.types';
import { MatrixDto } from './types/matrix.types';
import { inject } from '@angular/core';
import { MatrixService } from './services/matrix.service';

const matrixResolver: ResolveFn<MatrixDto> = (
  rote: ActivatedRouteSnapshot
) => {
  return inject(MatrixService).fetch(rote.paramMap.get('page'));
};

export const routes: Routes = [
  {
    path: ':page',
    component: PageComponent,
    resolve: { matrix: matrixResolver },
  },
  { path: ':page/:action?', component: ActionComponent },
  { path: '', redirectTo: PageTypeName.Groups, pathMatch: 'full' },
  { path: '**', redirectTo: PageTypeName.Groups, pathMatch: 'full' },
];
