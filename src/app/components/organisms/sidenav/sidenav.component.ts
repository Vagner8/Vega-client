import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatListModule, MatSidenavModule } from '@mat';
import { NavigateService, FractalService } from '@services';
import { IFractal, Click, Roots } from '@types';
import { TapComponent } from '@components/atoms';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, MatSidenavModule, TapComponent, RouterOutlet],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  open = computed(() => this.ns.Manager() === Click.One);
  fractal = computed(() => this.fs.fractal()?.find(this.ns.Taps() || ''));

  constructor(
    public ns: NavigateService,
    private fs: FractalService
  ) {}

  onClick({ name, type }: IFractal) {
    switch (type) {
      case Roots.Pages:
        this.ns.toPage(name);
        break;
      case Roots.Modifiers:
        this.ns.toModifier(name);
        break;
    }
  }
}
