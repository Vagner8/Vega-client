import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton, MatIcon } from '@mat';
import { TapService } from '@services';
import { ITap } from '@types';

@Component({
  selector: 'app-drawer-taps',
  standalone: true,
  imports: [RouterLink, MatIcon, MatButton],
  templateUrl: './drawer-taps.component.html',
  styleUrl: './drawer-taps.component.css',
})
export class DrawerTapsComponent {
  constructor(private _tap: TapService) {}

  get taps() {
    return this._tap.modifiers[this._tap.rec.toolbar()!].list;
  }

  onClick(tap: ITap): void {
    this._activateActionTaps();
    tap.onClick();
  }

  private _activateActionTaps() {
    const obj = this._tap.toolbar.obj;
    obj.actions.setState({ disabled: false });
    obj.settings.setState({ disabled: false });
  }
}
