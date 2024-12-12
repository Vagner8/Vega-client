import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { DeleteComponent, EditComponent, NewComponent, SaveComponent } from '@components/molecules';
import { MatListModule, MatSidenavModule } from '@mat';
import { FractalsParams, IFractal } from '@types';
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

  listTouched(tap: IFractal): void {
    this.ls.set(tap);
  }

  modifierTouched(tap: IFractal): void {
    this.ms.$modifier.set(tap);
    this.navigate({ [FractalsParams.Modifier]: tap.cursor });
  }
}
