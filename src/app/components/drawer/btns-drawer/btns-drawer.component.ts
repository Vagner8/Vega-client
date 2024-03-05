import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButton, MatIcon } from '@mat';
import { RecService, BtnService } from '@services';
import { Btn } from '@types';
import { isKeyofBtnGroup } from 'app/types/guards.types';

@Component({
  selector: 'app-btns-drawer',
  standalone: true,
  imports: [RouterLink, MatIcon, MatButton],
  templateUrl: './btns-drawer.component.html',
  styleUrl: './btns-drawer.component.css',
})
export class BtnsDrawerComponent {
  constructor(
    private _btn: BtnService,
    private _rec: RecService,
    private _router: Router
  ) {}

  btns(): Btn[] {
    const toolbarRecName = this._rec.get('btn', 'toolbar').name();
    if (!toolbarRecName || !isKeyofBtnGroup(toolbarRecName)) return [];
    return this._btn.btns[toolbarRecName];
  }

  onClick(btn: Btn): void {
    btn.rec();
    if (btn.signal().navigate) this._router.navigate(this._url(btn));
  }

  private _url(btn: Btn) {
    if (btn.type === 'navigation') return [btn.name];
    return [this._rec.get('btn', 'navigation').name(), btn.name];
  }
}
