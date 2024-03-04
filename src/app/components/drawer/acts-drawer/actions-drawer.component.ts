import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButton, MatIcon } from '@mat';
import { BtnRecsService, BtnActService } from '@services';
import { BtnAct, BtnActType } from '@types';

@Component({
  selector: 'app-actions-drawer',
  standalone: true,
  imports: [RouterLink, MatIcon, MatButton],
  templateUrl: './acts-drawer.component.html',
  styleUrl: './acts-drawer.component.css',
})
export class ActsDrawerComponent {
  constructor(
    private _btnActsService: BtnActService,
    private _btnRecsService: BtnRecsService,
    private _router: Router
  ) {}

  btnActs(): BtnAct[] {
    const toolbarRec = this._btnRecsService.recs[BtnActType.Toolbar]();
    if (!toolbarRec) return [];
    return this._btnActsService.getActs(toolbarRec.name);
  }

  onClick(buttonAct: BtnAct): void {
    this._btnRecsService.rec(buttonAct);
    const navigationRec = this._btnRecsService.navigationRec();
    const activityRec = this._btnRecsService.activityRec();
    // if (buttonAct.type === BtnActType.Navigation) {
    //   buttonAct.resetRec();
    // }
    console.log(
      '🚀 ~ `${navigationRec()?.name}/${activityRec()?.name}`:',
      `${navigationRec()?.name}/${activityRec()?.name}`
    );

    this._router.navigate([
      `${navigationRec()?.name || ''}/${activityRec()?.name || ''}`,
    ]);
  }
}
