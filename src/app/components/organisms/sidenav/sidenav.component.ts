import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@mat';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
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
  opened = false;
  opened$!: Observable<boolean>;

  constructor(public ss: StateService) {}

  ngOnInit(): void {
    this.opened$ = this.ss.manager.fractal$.pipe(
      map(() => {
        return (this.opened = this.ss.manager.fractal.was({ clicked: Click.One }).yes(() => {
          if (!this.opened) return;
          const { name } = this.ss.sidenavs.fractal;
          const toggleTaps = Roots[name === 'Pages' ? 'Modifiers' : 'Pages'];
          this.ss.sidenavs.set(this.ss.root.fractal?.find(toggleTaps));
        }).result);
      })
    );
  }
}
