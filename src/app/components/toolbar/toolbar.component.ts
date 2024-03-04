import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatIcon, MatToolbar, MatButtonModule } from '@mat';
import { BtnRecsService, BtnActService, CommonActsService } from '@services';
import { BtnAct, BtnActType, DrawerState, IconName } from '@types';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatIcon, MatToolbar, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit {
  isDisabled$!: Observable<boolean>;

  constructor(
    private _commonActsService: CommonActsService,
    private _btnActs: BtnActService,
    private _btnRecs: BtnRecsService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.isDisabled$ = this._router.events.pipe(
      map((data) => {
        if (!(data instanceof NavigationEnd)) return true;
        return data.urlAfterRedirects.toLowerCase().includes('home');
      })
    );
  }

  get toolbarActs() {
    return this._btnActs.getActs(BtnActType.Toolbar);
  }

  onClick(toolbarAct: BtnAct): void {
    this._btnRecs.rec(toolbarAct);
    if (toolbarAct.signal().icon === IconName.Close) {
      this._resetIcons();
      this._commonActsService.drawer.set(DrawerState.Close);
      return;
    } else {
      this._resetIcons();
      toolbarAct.update({ icon: IconName.Close });
      this._commonActsService.drawer.set(DrawerState.Open);
    }
  }

  private _resetIcons(): void {
    this._btnActs.acts[BtnActType.Toolbar].forEach((act) => act.reset('icon'));
  }
}
