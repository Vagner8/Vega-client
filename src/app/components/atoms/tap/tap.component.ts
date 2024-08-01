import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ClickDirective } from '@directives';
import { FractalService, TapService } from '@services';
import { TapsFractals, TapConfig } from '@types';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [MatIcon, MatButtonModule, ClickDirective],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.css',
})
export class TapComponent {
  @Input() config!: TapConfig;

  constructor(
    private ts: TapService,
    private fls: FractalService,
    private router: Router,
  ) {}

  onClick() {
    const { name, type } = this.config;
    switch (type) {
      case 'Fractals':
        this.fls.active.set(name as TapsFractals);
        this.ts.active.set(null);
        this.router.navigate([name]);
        break;
      case 'Actions':
      case 'Settings':
        this.ts.active.set(name);
        this.router.navigate([this.fls.active(), name]);
        break;
    }
  }
}
