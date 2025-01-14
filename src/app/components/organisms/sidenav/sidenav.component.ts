import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { MatListModule, MatSidenavModule } from '@mat';
import { CollectionsService, ManagerService, ModifiersService, TapsService, SelectService } from '@services';
import { IFractal } from '@types';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet, MatListModule, TapComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  ts = inject(TapsService);
  ss = inject(SelectService);
  ms = inject(ModifiersService);
  cs = inject(CollectionsService);
  mgr = inject(ManagerService);

  modifierHeld(tap: IFractal): void {
    this.ms.hold(tap);
  }

  modifierTouched(tap: IFractal): void {
    this.ms.touch(tap);
  }

  async collectionTouched(tap: IFractal): Promise<void> {
    this.ss.$fractals.set([]);
    await this.cs.set(tap);
    this.ms.touch(null);
  }
}
