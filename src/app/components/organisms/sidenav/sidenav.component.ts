import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatListModule, MatSidenavModule } from '@mat';
import { Click, FractalType, IFractal, Roots } from '@types';
import { TapComponent } from '@components/atoms';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { StoreService } from '@services';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatSidenavModule, TapComponent, RouterOutlet],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent implements OnInit {
  open$!: Observable<boolean>;
  prevTaps: Roots | null = null;
  taps$!: Observable<FractalType>;

  constructor(public ss: StoreService) {}

  ngOnInit(): void {
    this.open$ = this.ss.manager.observable$.pipe(
      map(() => {
        console.log('🚀 ~ manager.observable$:', this.ss.manager.acts.click);

        return this.ss.manager.acts.click?.is(Click.One);
      })
    );
  }

  onClick(fractal: IFractal) {
    this.ss.taps.add(fractal);
  }
}
