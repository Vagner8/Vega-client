import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { MatListModule, MatSidenavModule } from '@mat';
import { FractalService, RouterService, TapService } from '@services';
import { TapConfigModifier, TapConfigUnion, TapModifiersNames } from '@types';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatListModule, MatSidenavModule, TapComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  taps = computed(() => this.computedTaps());
  open = computed(() => this.computedOpen());

  constructor(
    public ts: TapService,

    private rs: RouterService,
    private fls: FractalService,
  ) {}

  private computedOpen(): boolean {
    return this.ts.manager() !== 3;
  }

  private computedTaps(): TapConfigUnion[] | null {
    if (!this.fls.data()) return null;
    const manager = this.ts.manager();
    const { pages, modifiers } = this.ts.data();
    if (manager === 3) return null;
    return manager === 2 ? this.setModifiers(modifiers) : pages;
  }

  private setModifiers(modifiers: TapConfigModifier[]): TapConfigModifier[] {
    return modifiers.map((tap) => ({ ...tap, disabled: !this.shouldActivate(tap.name) }));
  }

  private shouldActivate(name: TapModifiersNames): boolean {
    const length = this.fls.selected().length;
    let names: TapModifiersNames[] = [];
    if (length === 0) {
      names = ['Add'];
    } else if (length === 1) {
      names = ['Add', 'Edit', 'Delete'];
    } else {
      names = ['Add', 'Delete'];
    }
    return names.includes(name);
  }
}
