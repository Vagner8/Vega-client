import { Component } from '@angular/core';
import { MatIcon, MatToolbar, MatButtonModule } from '@mat';
import {
  BtnRecsService,
  BtnActService,
  CommonActsService,
} from '@services';
import { BtnAct, BtnActType, DrawerState } from '@types';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatIcon, MatToolbar, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  constructor(
    private _commonActsService: CommonActsService,
    private _btnActsService: BtnActService,
    private _btnRecsService: BtnRecsService
  ) {}

  get toolbarActs() {
    return this._btnActsService.getActs(BtnActType.Toolbar);
  }

  onOpenDrawer(toolbarAct: BtnAct): void {
    const toolbarActRec =
      this._btnRecsService.recs[BtnActType.Toolbar];
    if (toolbarActRec()?.name === toolbarAct.name) {
      this._commonActsService.drawer.set(DrawerState.Close);
      this._btnRecsService.reset();
    } else {
      this._btnRecsService.rec(toolbarAct);
      this._commonActsService.drawer.set(DrawerState.Open);
    }
  }
}
