import { Component } from '@angular/core';
import { MatButtonModule, MatIcon, MatProgressSpinnerModule } from '@mat';
import { ClickDirective } from '@directives';
import { Click, Fractal } from '@types';
import { StateService } from '@services';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [MatIcon, ClickDirective, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
})
export class ManagerComponent {
  constructor(public ss: StateService) {}

  onClick(fractal: Fractal): void {
    console.log('🚀 ~ onClick:');
    this.handleClick(fractal, Click.One);
  }

  onHold(fractal: Fractal): void {
    this.handleClick(fractal, Click.Hold);
  }

  private handleClick(fractal: Fractal, clicked: Click): void {
    this.ss.manager.set(fractal, { clicked });
  }
}
