import { Component } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { ClickDirective } from '@directives';
import { Click, Fractal } from '@types';
import { StateService } from '@services';
import { SpinnerComponent } from '@components/atoms';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [MatIcon, ClickDirective, MatButtonModule, SpinnerComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
})
export class ManagerComponent {
  constructor(public ss: StateService) {}

  onClick(fractal: Fractal): void {
    this.handleClick(fractal, Click.One);
  }

  onHold(fractal: Fractal): void {
    this.handleClick(fractal, Click.Hold);
  }

  private handleClick(fractal: Fractal, clicked: Click): void {
    this.ss.manager.set(fractal, { clicked });
  }
}