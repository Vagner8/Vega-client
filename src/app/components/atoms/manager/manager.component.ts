import { Component, Input } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { ClickDirective } from '@directives';
import { ControlsPipe, FractalPipe } from '@pipes';
import { ManagerService } from '@services';
import { IFractal } from '@types';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [
    MatIcon,
    FractalPipe,
    ControlsPipe,
    ClickDirective,
    MatButtonModule,
  ],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export class ManagerComponent {
  @Input({ required: true }) fractal!: IFractal;

  constructor(private ms: ManagerService) {}

  onClick(): void {
    this.ms.clickType.set('one');
  }

  onHoldClick(): void {
    this.ms.clickType.set('hold');
  }
}
