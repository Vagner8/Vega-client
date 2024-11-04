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
    combineLatest([this.ds.fractal.get(), this.route.queryParamMap]).subscribe(
      ([dto, queryParam]) => {
        if (this.ss.root.$fractal()) return;
        const { fractal } = this.ss.root.set(this.fs.toFractal(dto));
        this.ss.manager.set(fractal.find(Roots.Manager), {
          clicked: queryParam.get(Queries.Manager) || Click.One,
        });
        this.ss.page.set(fractal.find(this.Pages));
        this.ss.sidenavs.set(fractal.find(Roots.Pages));
        if (this.Modifiers) this.ss.modifier.set(fractal.find(this.Modifiers));
        const rows = queryParam.get(Queries.Rows);
        if (rows) {
          rows.split(':').forEach(id => this.ss.row.set(fractal.find(id)));
          this.ss.sidenavs.set(fractal.find(Roots.Modifiers));
        }
      }
    );
  }

  onRowClick(row: Fractal): void {
    this.ss.row.set(row);
    this.ss.sidenavs.set(this.ss.root.fractal.find(Roots.Modifiers));
    this.ss.manager.fractal
      .check({ clicked: Click.Hold })
      .yes(fractal => this.ss.manager.set(fractal, { clicked: Click.One }));
  }
}
