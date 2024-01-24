import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenu } from '@angular/material/menu';

type MatDrawertriggers = 'actions' | 'pages' | 'settings';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ToolbarComponent,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    RouterLink,
    MatMenu
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public matDrawerOpened: boolean = false;
  public matDrawertrigger!: MatDrawertriggers;

  public onOpenMatDrawer(matDrawertrigger: MatDrawertriggers): void {
    this.matDrawertrigger = matDrawertrigger;
    if (this.matDrawerOpened) return;
    this.matDrawerOpened = true;
  }
}
