import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatListModule, MatSidenavModule } from '@mat';
import { CommonActsService } from '@services';
import { ActsDrawerComponent } from './acts-drawer/acts-drawer.component';
import { DrawerState } from '@types';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [
    RouterOutlet,
    MatListModule,
    MatSidenavModule,
    ActsDrawerComponent,
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class DrawerComponent {
  constructor(private _commonActsService: CommonActsService) {}

  get opened(): boolean {
    return this._commonActsService.drawer() === DrawerState.Close ? false : true;
  }
}
