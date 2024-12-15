import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { DeleteComponent, EditComponent, NewComponent, SaveComponent } from '@components/molecules';
import { MatListModule, MatSidenavModule } from '@mat';
import { IFractal } from '@types';
import { SuperComponent } from '@utils';

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
export class SidenavComponent extends SuperComponent {
  hold(tap: IFractal): void {
    console.log('🚀 ~ tap:', tap);
  }

  async listTouched(tap: IFractal): Promise<void> {
    await this.ls.set(tap);
    this.ms.set(null);
  }

  modifierTouched(tap: IFractal): void {
    this.ms.set(tap);
  }
}
