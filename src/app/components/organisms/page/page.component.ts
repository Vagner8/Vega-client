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
  @Input() Pages = '';
  @Input() Modifiers = '';

  constructor(
    public ss: StateService,
    private fs: FractalService,
    private ds: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    combineLatest([this.ds.fractal.get(), this.route.queryParamMap]).subscribe(([dto, params]) => {
      if (this.ss.root.fractal) return;
      const { fractal } = this.ss.root.set(this.fs.toFractal(dto));
      this.ss.managerTap.set(fractal.find(Roots.Manager), {
        clicked: params.get(Roots.Manager) || Click.One,
      });
      this.ss.pageTap.set(fractal.find(this.Pages));
      this.ss.sidenavTaps.set(fractal.find(Roots.Pages));
      this.Modifiers && this.ss.modifierTap.set(fractal.find(this.Modifiers));
    });
  }

  onRowClick(row: Fractal): void {
    this.ss.sidenavTaps.set(this.ss.root.fractal.find(Roots.Modifiers));
    this.ss.managerTap.fractal
      .was({ clicked: Click.Hold })
      .yes(fractal => this.ss.managerTap.set(fractal, { clicked: Click.One }));
    this.ss.rowTap.set(row);
  }
}
