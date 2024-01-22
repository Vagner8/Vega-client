import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
    MatMenuModule,
    SettingsComponent,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements AfterViewInit {
  @ViewChildren(MatMenuTrigger)
  private _matMenuTriggerQueryLists!: QueryList<MatMenuTrigger>;

  private _matMenuTriggers!: MatMenuTrigger[];

  public ngAfterViewInit(): void {
    this._matMenuTriggers = this._matMenuTriggerQueryLists.toArray();
  }

  public onMenuOpened(menuName: string): void {
    this._matMenuTriggers.forEach((menuTrigger) => {
      if (menuTrigger.menuData !== menuName && menuTrigger.menuOpen) {
        menuTrigger.closeMenu();
      }
    });
  }

  public onClickMatToolbar({ target }: MouseEvent): void {
    if (target instanceof HTMLSpanElement) return
    this._matMenuTriggers.forEach((menuTrigger) => {
      if (menuTrigger.menuOpen) {
        menuTrigger.closeMenu();
      }
    });
  }
}
