import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { MatListModule, MatSidenavModule } from '@mat';
import { CollectionsService, ManagerService, ModifiersService, TapsService, UpdateService } from '@services';
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
  us = inject(UpdateService);
  ms = inject(ModifiersService);
  cs = inject(CollectionsService);
  mgr = inject(ManagerService);

  hold(tap: IFractal): void {
    console.log('🚀 ~ tap:', tap);
  }

  modifierTouched(tap: IFractal): void {
    this.ms.set(tap);
  }

  async collectionTouched(tap: IFractal): Promise<void> {
    this.us.$currents.set([]);
    await this.cs.set(tap);
    this.ms.set(null);
  }
}
