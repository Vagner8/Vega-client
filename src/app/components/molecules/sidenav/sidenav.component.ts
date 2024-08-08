import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { MatListModule, MatSidenavModule } from '@mat';
import { FractalService, RouterService, TapService } from '@services';
import { TapConfigUnion, TapModifiersNames } from '@types';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatListModule, MatSidenavModule, TapComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  open = computed(() => this.computedOpen());
  taps = computed(() => this.computedTaps());

  constructor(
    public ts: TapService,

    private rs: RouterService,
    private fls: FractalService,
  ) {}

  private computedOpen(): boolean {
    return Boolean(this.rs.params().type);
  }

  private computedTaps(): TapConfigUnion[] | null {
    if (!this.fls.data()) return null;
    const data = this.ts.data();
    if (this.fls.selected().length) {
      return data.Modifier.map((tap) =>
        this.activateModifiers().includes(tap.name)
          ? { ...tap, disabled: false }
          : { ...tap, disabled: true },
      );
    }
    const { type } = this.rs.params();
    return type ? data[type] : null;
  }

  private activateModifiers(): TapModifiersNames[] {
    let names: TapModifiersNames[] = [];
    const length = this.fls.selected().length;
    if (length === 0) {
      names = ['Add'];
    }
    if (length === 1) {
      names = ['Add', 'Edit', 'Delete'];
    }
    if (length > 1) {
      names = ['Add', 'Delete'];
    }
    return names;
  }
}
