import { Component } from '@angular/core';
import { CommonStateService } from '@services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private _commonStateService: CommonStateService) {}

  get url() {
    return this._commonStateService.url;
  }
}
