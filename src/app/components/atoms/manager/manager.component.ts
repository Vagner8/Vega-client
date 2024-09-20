import { Component, Input } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { ClickDirective } from '@directives';
import { Click, Roots, IFractal } from '@types';
import { NavigateService } from '@services';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [MatIcon, ClickDirective, MatButtonModule],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export class ManagerComponent {
  @Input({ required: true }) fractal!: IFractal;

  constructor(private ns: NavigateService) {}

  async onClick(): Promise<void> {
    await this.ns.toTaps(this.tapToggle());
    this.ns.toManager(Click.One);
  }

  onHoldClick(): void {
    this.ns.toManager(Click.Hold);
  }

  private tapToggle(): string {
    const { Taps, Manager } = this.ns;
    let tap = Roots.Pages;
    if (Manager() !== Click.Hold) {
      tap = Roots[Taps() === Roots.Pages ? 'Modifiers' : 'Pages'];
    }
    return tap;
  }
}
