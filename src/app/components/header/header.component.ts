import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavService } from '@services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private nav: NavService) {}

  get address() {
    return this.nav.address;
  }
}
