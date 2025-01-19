import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { MatListModule, MatSidenavModule } from '@mat';
import { ManagerService, ModifiersService, TapsService, SelectService } from '@services';
import { IFractal, Modifiers } from '@types';
import { BaseService } from 'app/services/base.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet, MatListModule, TapComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  bs = inject(BaseService);
  ts = inject(TapsService);
  ss = inject(SelectService);
  ms = inject(ModifiersService);
  mgr = inject(ManagerService);

  modifierHeld(tap: IFractal): void {
    this.ms.hold(tap);
  }

  modifierTouched(modifier: IFractal): void {
    this.ms.touch(modifier);
    switch (modifier?.cursor) {
      case Modifiers.New:
        console.log('🚀 ~ this.ss.$parent():', this.ss.$parent());

        console.log('🚀 ~ this.ss.$parent()!.createChild():', this.ss.$parent()!.createChild());

        this.ss.setToAdd(this.ss.$parent()!.createChild());
        break;
    }
  }

  async collectionTouched(tap: IFractal): Promise<void> {
    this.ss.$toUpdate.set([]);
    this.ss.setParent(tap);
    await this.bs.navigate({}, [tap.cursor]);
    this.ms.touch(null);
  }
}
