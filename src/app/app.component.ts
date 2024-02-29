import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DrawerComponent,
  HeaderComponent,
  ToolbarComponent,
} from '@components';
import { CommonStateService } from '@services';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DrawerComponent, ToolbarComponent, HeaderComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  private _subscription: Subscription[] = [];

  constructor(
    private _commonStateService: CommonStateService,
    private _router: Router,
  ) {}

  ngOnInit() {
    this._subscription = [this._routerEventsSubscribe()];
  }

  ngOnDestroy() {
    this._subscription.forEach((subscription) => subscription.unsubscribe());
  }

  get error() {
    return this._commonStateService.error;
  }

  private _routerEventsSubscribe() {
    return this._router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) return;
      this._commonStateService.setUrl(event.urlAfterRedirects);
    });
  }
}
