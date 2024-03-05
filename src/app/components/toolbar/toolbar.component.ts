import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatIcon, MatToolbar, MatButtonModule } from '@mat';
import { RecService, BtnService, CommonActsService } from '@services';
import { Btn } from '@types';
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
    private _btn: BtnService,
    private _rec: RecService,
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

  get toolbarBtns() {
    return this._btn.btns.toolbar;
  }

  onClick(toolbarAct: Btn): void {
    toolbarAct.rec();
    if (toolbarAct.signal().icon === 'close') {
      this._resetIcons();
      this._commonActsService.drawer.set('open');
      return;
    } else {
      this._resetIcons();
      toolbarAct.update({ icon: 'close' });
      this._commonActsService.drawer.set('open');
    }
  }

  private _resetIcons(): void {
    this._btn.btns.toolbar.forEach((act) => act.reset('icon'));
  }
}
