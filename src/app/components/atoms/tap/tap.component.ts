import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ClickDirective } from '@directives';
import { StateService } from '@services';
import { TapConfig } from '@types';

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
    private ss: StateService,
    private router: Router,
  ) {}

  onClick() {
    const { navigation, name } = this.config;
    navigation && this.router.navigate([name]);
  }
}
