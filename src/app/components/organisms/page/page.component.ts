import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TableComponent } from '@components/atoms';
import { DataService, FractalService, StateService } from '@services';
import { Click, Fractal, Roots } from '@types';
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
  @Input() Rows = '';
  @Input() Pages = '';
  @Input() Manager = '';
  @Input() Modifiers = '';

  constructor(
    public ss: StateService,
    private fs: FractalService,
    private ds: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('🚀 ~ Rows:', this.Rows);
    console.log('🚀 ~ Manager:', this.Manager);

    combineLatest([this.ds.get(), this.route.queryParamMap]).subscribe(([dto]) => {
      if (this.ss.root.$fractal()) return;
      const root = this.ss.root.set(this.fs.toFractal(dto));
      this.ss.manager.set(root.fractal.find(Roots.Manager), {
        clicked: this.Manager || Click.One,
      });
      this.ss.page.set(root.fractal.find(this.Pages));
      if (this.Modifiers && this.Rows) {
        this.ss.modifier.set(root.fractal.find(this.Modifiers));
        this.Rows.split(':').forEach(id => this.ss.row.set(root.fractal.find(id)));
        this.ss.sidenavTaps.set(root.fractal.find(Roots.Modifiers));
      } else {
        this.ss.sidenavTaps.set(root.fractal.find(Roots.Pages));
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
