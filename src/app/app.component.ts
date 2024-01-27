import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatDividerModule,
  MatListModule,
  MatMenu,
} from '@mat';
import { ScrollToBottomDirective } from './directives/scroll-to-bottom.directive';

type matDrawerTriggers = 'actions' | 'pages' | 'settings';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatMenu,

    ScrollToBottomDirective
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public matDrawerOpened: boolean = false;
  public matDrawerTrigger!: matDrawerTriggers;

  public onOpenMatDrawer(matDrawerTrigger: matDrawerTriggers): void {
    this.matDrawerTrigger = matDrawerTrigger;
    if (this.matDrawerOpened) return;
    this.matDrawerOpened = true;
  }
}
