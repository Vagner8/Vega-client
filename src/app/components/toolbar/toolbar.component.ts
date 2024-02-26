import { Component } from '@angular/core';
import { DrawerStateService } from '@services';
import { MatIcon, MatToolbar, MatButtonModule } from '@mat';
import { TriggersType } from '@types';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatIcon, MatToolbar, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  constructor(private _drawerStateService: DrawerStateService) {}

  public onOpenDrawer(trigger: keyof TriggersType.Triggers): void {
    this._drawerStateService.setTrigger(trigger);
    if (this._drawerStateService.opened()) return;
    this._drawerStateService.setOpened(true);
  }
}
