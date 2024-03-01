import { Component } from '@angular/core';
import { DrawerStateService } from '@services';
import { MatIcon, MatToolbar, MatButtonModule } from '@mat';
import { DrawerActions } from '@types';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatIcon, MatToolbar, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  constructor(private _drawerStateService: DrawerStateService) {}

  onOpenDrawer(action: keyof DrawerActions): void {
    if (this._drawerStateService.currentAction() === action) {
      this._drawerStateService.currentAction.set(null);
      return this._drawerStateService.opened.set(false);
    }
    this._drawerStateService.currentAction.set(action);
    if (this._drawerStateService.opened()) return;
    this._drawerStateService.opened.set(true);
  }
}
