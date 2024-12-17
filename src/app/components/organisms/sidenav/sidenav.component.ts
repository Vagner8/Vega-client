import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { DeleteComponent, EditComponent, NewComponent, SaveComponent } from '@components/molecules';
import { MatListModule, MatSidenavModule } from '@mat';
import {
  CollectionsService,
  ManagerService,
  ModifiersService,
  RowsService,
  TapsService,
} from '@services';
import { IFractal } from '@types';

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
  cs = inject(CollectionsService);
  rs = inject(RowsService);
  ms = inject(ModifiersService);
  mgr = inject(ManagerService);

  hold(tap: IFractal): void {
    console.log('🚀 ~ tap:', tap);
  }

  async listTouched(tap: IFractal): Promise<void> {
    await this.rs.set(null);
    await this.cs.set(tap);
    this.ms.set(null);
  }

  modifierTouched(tap: IFractal): void {
    this.ms.set(tap);
  }

  appModifierTouched(tap: IFractal): void {
    this.cs.set(tap);
  }
}
