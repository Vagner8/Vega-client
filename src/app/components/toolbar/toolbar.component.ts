import { Component, WritableSignal } from '@angular/core';
import { DrawerTriggers, GlobalStateService } from '@services';
import { MatIcon, MatToolbar, MatButtonModule } from '@mat';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatIcon, MatToolbar, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  error: WritableSignal<string | null>;

  constructor(private _globalStateService: GlobalStateService) {
    this.error = this._globalStateService.error
  }

  public onOpenDrawer(drawerTrigger: DrawerTriggers): void {
    this._globalStateService.drawerTrigger.set(drawerTrigger);
    if (this._globalStateService.drawerOpened()) return;
    this._globalStateService.drawerOpened.set(true);
  }
}
