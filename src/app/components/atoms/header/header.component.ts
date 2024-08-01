import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FractalService, TapService } from '@services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    public ts: TapService,
    public fls: FractalService,
  ) {}
}
