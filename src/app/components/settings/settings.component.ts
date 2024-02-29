import { Component, OnInit } from '@angular/core';
import { NavigationError, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationError) {
        console.log('NavigationError:', event);
      }
    });
  }
}
