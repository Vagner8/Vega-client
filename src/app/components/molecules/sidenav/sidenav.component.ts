import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { MatListModule, MatSidenavModule } from '@mat';
import { FractalService, TapService } from '@services';
import { ManagerService } from 'app/services/manager.service';
import { FractalDto } from '@types';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatListModule, MatSidenavModule, TapComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  taps = computed<FractalDto[] | null>(() => this.computedTaps());
  open = computed(() => this.computedOpen());

  constructor(
    public ts: TapService,
    public fs: FractalService,
    public ms: ManagerService,
  ) {}

  private computedOpen(): boolean {
    return this.ms.clickType() !== 'double';
  }

  private computedTaps(): FractalDto[] | null {
    const taps = this.ms.clickType() === 'one' ? this.fs.Pages() : null;
    return taps && Object.values(taps.fractals);
  }

  // private setModifiers(modifiers: TapConfigModifier[]): TapConfigModifier[] {
  //   return modifiers.map((tap) => ({ ...tap, disabled: !this.shouldActivate(tap.name) }));
  // }

  // private shouldActivate(name: TapModifiersNames): boolean {
  //   const length = this.fls.selected().length;
  //   let names: TapModifiersNames[] = [];
  //   if (length === 0) {
  //     names = ['Add'];
  //   } else if (length === 1) {
  //     names = ['Add', 'Edit', 'Delete'];
  //   } else {
  //     names = ['Add', 'Delete'];
  //   }
  //   return names.includes(name);
  // }
}
