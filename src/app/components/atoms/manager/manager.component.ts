import { Component } from '@angular/core';
import { MatButtonModule, MatIcon, MatProgressSpinnerModule } from '@mat';
import { ClickDirective } from '@directives';
import { Click, Fractal } from '@types';
import { StateService } from '@services';
import { interval, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [MatIcon, AsyncPipe, ClickDirective, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
})
export class ManagerComponent {
  timeout$ = interval().pipe(map(num => num * 100));

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
