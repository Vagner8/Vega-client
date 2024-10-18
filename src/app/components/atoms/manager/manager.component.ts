import { Component } from '@angular/core';
import { MatButtonModule, MatIcon, MatProgressSpinner } from '@mat';
import { ClickDirective } from '@directives';
import { Click, Fractal, Roots } from '@types';
import { StateService } from '@services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [MatIcon, ClickDirective, MatButtonModule, MatProgressSpinner],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export class ManagerComponent {
  constructor(
    public ss: StateService,
    private router: Router
  ) {}

  onClick(fractal: Fractal): void {
    this.handleClick(fractal, Click.One);
  }

  onHoldClick(fractal: Fractal): void {
    this.handleClick(fractal, Click.Hold);
  }

  private handleClick(fractal: Fractal, clicked: Click): void {
    this.ss.managerTap.set(fractal, { clicked });
    this.router.navigate([], {
      queryParams: { [Roots.Manager]: clicked },
      queryParamsHandling: 'merge',
    });
  }
}
