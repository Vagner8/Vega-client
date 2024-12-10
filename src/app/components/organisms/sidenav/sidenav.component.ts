import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { DeleteComponent, EditComponent, NewComponent, SaveComponent } from '@components/molecules';
import { MatListModule, MatSidenavModule } from '@mat';
import { IFractal, Types } from '@types';
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

  pageTouched(tap: IFractal): void {
    this.rs.clear();
    this.fs.table.set(tap);
    this.fs.modifier.set(null);
    this.navigate({ [Types.Rows]: null, [Types.Modifier]: null }, [tap.cursor]);
  }

  modifierTouched(tap: IFractal): void {
    this.fs.modifier.set(tap);
    this.navigate({ [Types.Modifier]: tap.cursor });
  }
}
