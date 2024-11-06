import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TableComponent } from '@components/atoms';
import { DataService, FractalService, StateService } from '@services';
import { Click, Fractal, Queries, Roots } from '@types';
import { combineLatest } from 'rxjs';
import { ModifierComponent } from '../modifier/modifier.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterOutlet, TableComponent, ModifierComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent implements OnInit {
  @Input() Pages = '';
  @Input() Modifiers = '';

  constructor(
    public ss: StateService,
    private fs: FractalService,
    private ds: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.ss.root.$fractal()) return;
    combineLatest([this.ds.get(), this.route.queryParamMap]).subscribe(([dto, queryParam]) => {
      const { fractal } = this.ss.root.set(this.fs.toFractal(dto));
      this.ss.sidenavTaps.set(fractal.find(Roots.Pages));
      this.ss.manager.set(fractal.find(Roots.Manager), {
        clicked: queryParam.get(Queries.Manager) || Click.One,
      });
      this.ss.page.set(fractal.find(this.Pages));
      if (this.Modifiers) this.ss.modifier.set(fractal.find(this.Modifiers));
      const rows = queryParam.get(Queries.Rows);
      if (rows) {
        rows.split(':').forEach(id => this.ss.row.set(fractal.find(id)));
        this.ss.sidenavTaps.set(fractal.find(Roots.Modifiers));
      }
    });
  }

  onRowClick(row: Fractal): void {
    this.ss.row.set(row);
    this.ss.sidenavTaps.set(this.ss.root.fractal.find(Roots.Modifiers));
    this.ss.manager.fractal.checkActions({ clicked: Click.Hold }) &&
      this.ss.manager.set(this.ss.manager.fractal, { clicked: Click.One });
  }
}
