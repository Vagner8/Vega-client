import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationService } from '@services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private navigation: NavigationService) {}

  get address() {
    return this.navigation.address;
  }
}
