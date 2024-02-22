import { Component } from '@angular/core';
import { DrawerStateService } from '@services';
import { MatIcon, MatToolbar, MatButtonModule } from '@mat';
import { DrawerTypes } from '@types';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatIcon, MatToolbar, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  constructor(private _drawerStateService: DrawerStateService) {}

  public onOpenDrawer(drawerTrigger: DrawerTypes.Triggers): void {
    this._drawerStateService.trigger.set(drawerTrigger);
    if (this._drawerStateService.isOpened()) return;
    this._drawerStateService.isOpened.set(true);
  }
}
