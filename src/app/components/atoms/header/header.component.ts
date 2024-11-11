import { Component } from '@angular/core';
import { FractalService } from '@services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(public fs: FractalService) {}
}
