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
    private _btnActs: BtnActService,
    private _btnRecs: BtnRecsService,
    private _router: Router
  ) {}

  btnActs(): BtnAct[] {
    const toolbarRecName = this._btnRecs.toolbar()?.name;
    if (!toolbarRecName) return [];
    return this._btnActs.getActs(toolbarRecName);
  }

  onClick(btnAct: BtnAct): void {
    this._btnRecs.rec(btnAct);
    if (btnAct.signal().navigate) this._router.navigate(this._url(btnAct));
  }

  private _url(btnAct: BtnAct) {
    if (btnAct.type === BtnActType.Navigation) return [btnAct.name];
    return [this._btnRecs.navigation()?.name, btnAct.name];
  }
}
