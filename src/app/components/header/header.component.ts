import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private _address: [string, string] | null = null;

  @Input()
  set address(value: [string, string] | null) {
    this._address = value;
  }

  get address(): string {
    return this._address ? this._address.join(' ') : '';
  }
}
