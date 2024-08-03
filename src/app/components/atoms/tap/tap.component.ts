import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ClickDirective } from '@directives';
import { RouterService } from '@services';
import { TapConfigUnion } from '@types';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [MatIcon, MatButtonModule, ClickDirective],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.css',
})
export class TapComponent {
  @Input() config!: TapConfigUnion;

  constructor(
    private rs: RouterService,
    private router: Router,
  ) {}

  onClick() {
    const { name, type } = this.config;
    switch (type) {
      case 'pages':
        this.router.navigate([name]);
        break;
      case 'modifiers':
      case 'settings':
        this.router.navigate([this.rs.fractal(), name]);
        break;
    }
  }
}
