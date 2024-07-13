import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ClickDirective } from '@directives';
import { TapConfig, TapNames } from '@types';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [MatIcon, MatButtonModule, ClickDirective],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.css',
})
export class TapComponent {
  @Input() config!: TapConfig;

  constructor(private router: Router) {}

  onClick() {
    const { navigation, name } = this.config;
    navigation && this.navigate(name);
  }

  private navigate(name: TapNames) {
    this.router.navigate([name]);
  }
}
