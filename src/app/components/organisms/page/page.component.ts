import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TableComponent } from '@components/atoms';
import { DataService, FractalService, StateService } from '@services';
import { Click, Fractal, Modifiers, Roots } from '@types';
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
    combineLatest([this.ds.get(), this.route.queryParamMap]).subscribe(async ([dto]) => {
      if (this.ss.root.$fractal()) return;
      const root = await this.ss.root.set(this.fs.toFractal(dto));
      await this.ss.manager.set(root.fractal.find(Roots.Manager), {
        clicked: this.Manager || Click.One,
      });
      await this.ss.page.set(root.fractal.find(this.Pages));
      if (this.Modifiers && this.Rows) {
        this.ss.modifier.set(root.fractal.find(this.Modifiers));
        this.Rows.split(':').forEach(id => {
          if (this.Modifiers === Modifiers.New) {
            this.ss.row.set(this.ss.page.fractal.clone());
          } else {
            this.ss.row.set(root.fractal.find(id));
          }
        });
        this.ss.sidenavTaps.set(root.fractal.find(Roots.Modifiers));
      } else {
        this.ss.sidenavTaps.set(root.fractal.find(Roots.Pages));
      }
    });
  }

  async onRowClick(row: Fractal): Promise<void> {
    await this.ss.row.set(row);
    await this.ss.sidenavTaps.set(this.ss.root.fractal.find(Roots.Modifiers));
    this.ss.manager.fractal.checkActions({ clicked: Click.Hold }) &&
      this.ss.manager.set(this.ss.manager.fractal, { clicked: Click.One });
  }
}
