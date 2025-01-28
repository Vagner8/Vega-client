import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { MatListModule, MatSidenavModule } from '@mat';
import { ManagerService, ModifiersService, TapsService, SelectService, DataService } from '@services';
import { Fractal, Modifiers } from '@types';
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
  ds = inject(DataService);
  ts = inject(TapsService);
  ss = inject(SelectService);
  ms = inject(ModifiersService);
  mgr = inject(ManagerService);

  modifierHeld(modifier: Fractal): void {
    this.ms.hold(modifier);
    const toUpdate = this.ss.$toUpdate();
    switch (modifier.cursor) {
      case Modifiers.Delete:
        if (toUpdate.length > 0) {
          this.ds.delete(toUpdate.map(({ dto }) => dto)).subscribe();
        }
        break;
    }
  }

  modifierTouched(modifier: Fractal): void {
    this.ms.touch(modifier);
    switch (modifier.cursor) {
      case Modifiers.New:
        // this.ss.setToAdd(new Fractal(this.ss.$parent()));
        break;
    }
  }

  async collectionTouched(tap: Fractal): Promise<void> {
    this.ss.$toUpdate.set([]);
    this.ss.setParent(tap);
    await this.bs.navigate({}, [tap.cursor]);
    this.ms.touch(null);
  }
}
