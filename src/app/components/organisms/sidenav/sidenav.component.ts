import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@mat';
import { CommonModule } from '@angular/common';
import { map, Observable, tap } from 'rxjs';
import { StateService } from '@services';
import { Click, Pages, Roots } from '@types';
import { SidenavTapsComponent } from '@components/molecules';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, SidenavTapsComponent, RouterOutlet],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
  isOpen = false;
  isOpen$!: Observable<boolean>;

  constructor(public ss: StateService) {}

  ngOnInit(): void {
    this.isOpen$ = this.ss.manager.fractal$.pipe(
      map(() => this.ss.manager.fractal.checkActions({ clicked: Click.One })),
      tap(isOpen => {
        if (this.ss.page.$fractal()?.checkName(Pages.Home)) return;
        if (this.isOpen && isOpen) {
          const { name } = this.ss.sidenavTaps.fractal;
          const toggleTaps = Roots[name === 'Pages' ? 'Modifiers' : 'Pages'];
          this.ss.sidenavTaps.set(this.ss.root.fractal?.find(toggleTaps));
        }
        this.isOpen = isOpen;
      })
    );
  }
}
