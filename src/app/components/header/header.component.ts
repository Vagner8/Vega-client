import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteParam } from '@types';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  header$!: Observable<string>;

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.header$ = this._route.paramMap.pipe(
      map(
        (paramMap) =>
          `${paramMap.get(RouteParam.First) || ''} ${paramMap.get(RouteParam.Second) || ''}`
      )
    );
  }
}
