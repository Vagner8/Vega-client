import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatListModule, MatSidenavModule } from '@mat';
import { CommonActsService } from '@services';
import { BtnsDrawerComponent } from './btns-drawer/btns-drawer.component';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [RouterOutlet, MatListModule, MatSidenavModule, BtnsDrawerComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class DrawerComponent {
  constructor(private _commonActsService: CommonActsService) {}

  get opened(): boolean {
    return this._commonActsService.drawer() === 'close' ? false : true;
  }
}
