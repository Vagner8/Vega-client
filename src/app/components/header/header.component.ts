import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  url = '';

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this._router.events.subscribe((data) => {
      if (!(data instanceof NavigationEnd)) return;
      this.url = data.urlAfterRedirects;
    });
  }
}
