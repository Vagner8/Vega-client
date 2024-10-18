import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatListModule, MatSidenavModule } from '@mat';
import { TapComponent } from '@components/atoms';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { StateService } from '@services';
import { Click, Fractal, Pages, Queries, Roots } from '@types';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatSidenavModule, TapComponent, RouterOutlet],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent implements OnInit {
  opened = false;
  opened$!: Observable<boolean>;

  constructor(
    public ss: StateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.opened$ = this.ss.managerTap.fractal$.pipe(
      map(() => {
        return (this.opened = this.ss.managerTap.fractal.was(
          { clicked: Click.One },
          {
            yes: () => {
              if (!this.opened) return;
              const name = this.ss.sidenavTaps.fractal.name;
              const toggleTaps = Roots[name === 'Pages' ? 'Modifiers' : 'Pages'];
              this.ss.sidenavTaps.set(this.ss.root.fractal.find(toggleTaps));
            },
          }
        ));
      })
    );
  }

  onClick(fractal: Fractal) {
    fractal.is(Pages, {
      yes: () => {
        this.ss.pageTap.set(fractal);
        this.router.navigate([fractal.name], {
          queryParams: { [Queries.Manager]: this.ss.managerTap.fractal.clicked },
        });
      },
      no: () => {
        this.ss.modifierTap.set(fractal);
        this.router.navigate([this.ss.pageTap.fractal.name, fractal.name], {
          queryParamsHandling: 'merge',
        });
      },
    });
  }
}
