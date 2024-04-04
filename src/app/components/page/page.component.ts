import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouteParam } from '@types';
import { CreateComponent } from '../create/create.component';
import { ControlComponent } from '../control/control.component';
import { HeaderComponent } from '../header/header.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CreateComponent, TableComponent, ControlComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent implements OnInit {
  address$!: Observable<[string, string]>;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.address$ = this._route.paramMap.pipe(
      map(
        (paramMap) =>
          [`${paramMap.get(RouteParam.First) || ''}`, `${paramMap.get(RouteParam.Second) || ''}`]
      )
    );
  }
}
