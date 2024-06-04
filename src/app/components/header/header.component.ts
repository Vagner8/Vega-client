import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TapService } from '@services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private tap: TapService) {}

  get address() {
    return this.tap.address;
  }
}
