import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { DeleteComponent, EditComponent, NewComponent, SaveComponent } from '@components/molecules';
import { MatListModule, MatSidenavModule } from '@mat';
import {
  AppModifierService,
  CollectionsService,
  ManagerService,
  ModifiersService,
  RowsService,
  TapsService,
} from '@services';
import { IFractal, Modifiers } from '@types';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterOutlet,
    MatListModule,
    TapComponent,
    NewComponent,
    SaveComponent,
    EditComponent,
    DeleteComponent,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  ts = inject(TapsService);
  rs = inject(RowsService);
  ms = inject(ModifiersService);
  cs = inject(CollectionsService);
  mgr = inject(ManagerService);
  ams = inject(AppModifierService);

  hold(tap: IFractal): void {
    console.log('🚀 ~ tap:', tap);
  }

  async listTouched(tap: IFractal): Promise<void> {
    await this.rs.set(null);
    await this.cs.set(tap);
    this.ms.set(null);
  }

  modifierTouched(tap: IFractal): void {
    if (this.cs.current.is(Modifiers.App)) {
      this.ms.$current.set(tap);
    } else {
      this.ms.set(tap);
    }
  }
}
