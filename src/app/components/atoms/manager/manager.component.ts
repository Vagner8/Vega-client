import { Component, Input } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { ClickDirective } from '@directives';
import { ClickType, IFractal } from '@types';
import { RouterService } from '@services';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [MatIcon, ClickDirective, MatButtonModule],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export class ManagerComponent {
  @Input({ required: true }) fractal!: IFractal;

  constructor(private rs: RouterService) {}

  onClick(): void {
    this.rs.navigateByManager(ClickType.One);
  }

  onHoldClick(): void {
    this.rs.navigateByManager(ClickType.Hold);
  }
}
