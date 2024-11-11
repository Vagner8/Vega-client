import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TableComponent } from '@components/atoms';
import { DataService, FractalService } from '@services';
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
    public fs: FractalService,
    private ds: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    combineLatest([this.ds.get(), this.route.queryParamMap]).subscribe(async ([dto]) => {
      if (this.fs.root.$fractal()) return;
      const root = await this.fs.root.set(this.fs.toFractal(dto));
      await this.fs.manager.set(root.fractal.find(Roots.Manager), {
        clicked: this.Manager || Click.One,
      });
      await this.fs.page.set(root.fractal.find(this.Pages));
      if (this.Modifiers && this.Rows) {
        this.fs.modifier.set(root.fractal.find(this.Modifiers));
        this.Rows.split(':').forEach(id => {
          if (this.Modifiers === Modifiers.New) {
            this.fs.row.set(this.fs.clone());
          } else {
            this.fs.row.set(root.fractal.find(id));
          }
        });
        this.fs.sidenavTaps.set(root.fractal.find(Roots.Modifiers));
      } else {
        this.fs.sidenavTaps.set(root.fractal.find(Roots.Pages));
      }
    });
  }

  async onRowClick(row: Fractal): Promise<void> {
    await this.fs.row.set(row);
    await this.fs.sidenavTaps.set(this.fs.root.fractal.find(Roots.Modifiers));
    this.fs.manager.fractal.checkActions({ clicked: Click.Hold }) &&
      this.fs.manager.set(this.fs.manager.fractal, { clicked: Click.One });
  }
}
