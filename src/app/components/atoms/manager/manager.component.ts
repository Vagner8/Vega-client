import { Component, Input } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { ClickDirective } from '@directives';
import { Click, IFractal } from '@types';
import { StoreService } from '@services';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [MatIcon, ClickDirective, MatButtonModule],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export class ManagerComponent {
  @Input({ required: true }) fractal!: IFractal;

  constructor(private ss: StoreService) {}

  onClick(): void {
    this.ss.manager.add(this.fractal, Click.One);
  }

  onHoldClick(): void {
    this.ss.manager.add(this.fractal, Click.Hold);
  }
}
