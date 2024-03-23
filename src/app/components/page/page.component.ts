import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { EntityService } from '@services';
import { Subscription } from 'rxjs';
import { TableComponent } from '../table/table.component';
import { EntityDto, RouteParam } from '@types';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TableComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  entitiesDto?: EntityDto[];

  constructor(private _route: ActivatedRoute, private _entity: EntityService) {}

  ngOnInit(): void {
    this._subscriptions.push(this._route.data.subscribe(this._entity.set));
    this._subscriptions.push(
      this._route.paramMap.subscribe(this._setEntitiesDto)
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private _setEntitiesDto = (paramMap: ParamMap): void => {
    this.entitiesDto = this._entity.get(paramMap.get(RouteParam.First));
  };
}
