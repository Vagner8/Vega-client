import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButton, MatIcon } from '@mat';
import { TapService } from '@services';
import { PageTapName, Tap, TapName, TapPlace, ToolbarTapName } from '@types';

@Component({
  selector: 'app-drawer-taps',
  standalone: true,
  imports: [RouterLink, MatIcon, MatButton],
  templateUrl: './drawer-taps.component.html',
  styleUrl: './drawer-taps.component.css',
})
export class BtnsDrawerComponent implements OnInit {
  toolbarActionsTap!: Tap;
  toolbarSettingsTap!: Tap;

  constructor(private _tap: TapService, private _router: Router) {}

  ngOnInit(): void {
    this.toolbarActionsTap = this._tap.getToolbarTap(ToolbarTapName.Actions);
    this.toolbarSettingsTap = this._tap.getToolbarTap(ToolbarTapName.Settings);
  }

  get taps(): Tap[] {
    return this._tap.getTaps(this._tap.getRec(TapPlace.Toolbar));
  }

  onClick(tap: Tap): void {
    tap.click();
    if (tap.options?.navigation) this._router.navigate(tap.url());
    this._disableActionsAndSettingsTaps(tap.name);
  }

  private _disableActionsAndSettingsTaps(name: TapName) {
    const disabled = name !== PageTapName.Home;
    this.toolbarActionsTap.update({ disabled });
    this.toolbarSettingsTap.update({ disabled });
  }
}
