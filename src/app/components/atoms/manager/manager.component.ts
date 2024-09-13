import { Component, Input } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { ClickDirective } from '@directives';
import { ManagerService } from '@services';
import { ClickType, IFractal } from '@types';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [MatIcon, ClickDirective, MatButtonModule],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export class ManagerComponent {
  @Input({ required: true }) fractal!: IFractal;

  constructor(private ms: ManagerService) {}

  onClick(): void {
    this.ms.clickType.set(ClickType.One);
  }

  onHoldClick(): void {
    this.ms.clickType.set(ClickType.Hold);
  }
}
