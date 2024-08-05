import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ClickDirective } from '@directives';
import { FractalService, RouterService } from '@services';
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
    private fls: FractalService,
    private router: Router,
  ) {}

  onClick() {
    const { name, type } = this.config;
    switch (type) {
      case 'pages':
        this.router.navigate([name]);
        break;
      case 'modifiers':
        this.router.navigate([this.rs.params()?.page, name, this.ids()]);
        break;
    }
  }

  ids(): string {
    return Array.from(this.fls.selected)
      .map(({ id }) => id)
      .join(':');
  }
}
