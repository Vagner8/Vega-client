import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@mat';
import { CommonModule } from '@angular/common';
import { map, Observable, tap } from 'rxjs';
import { StateService } from '@services';
import { Click, Roots } from '@types';
import { SidenavsComponent } from '@components/molecules';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, SidenavsComponent, RouterOutlet],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent implements OnInit {
  isOpen = false;
  opened$!: Observable<boolean>;

  constructor(public ss: StateService) {}

  ngOnInit(): void {
    this.opened$ = this.ss.manager.fractal$.pipe(
      map(() => this.shouldOpenSidenav()),
      tap(isOpen => {
        this.isOpen = isOpen;
        isOpen && this.toggleSidenav();
      })
    );
  }

  shouldOpenSidenav() {
    return this.ss.manager.fractal.isActions({ clicked: Click.One });
  }

  toggleSidenav() {
    const { name } = this.ss.sidenavs.fractal;
    const toggleTaps = Roots[name === 'Pages' ? 'Modifiers' : 'Pages'];
    const targetSidenav = this.ss.root.fractal?.find(toggleTaps);

    if (targetSidenav) {
      this.ss.sidenavs.set(targetSidenav);
    }
  }
}
