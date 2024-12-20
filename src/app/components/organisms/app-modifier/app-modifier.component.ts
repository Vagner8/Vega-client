import { Component, inject, Input } from '@angular/core';
import { MatExpansionModule } from '@mat';
import { AppModifierService } from '@services';
import { IFractal } from '@types';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [MatExpansionModule, ExpansionPanelComponent],
  templateUrl: './app-modifier.component.html',
  styleUrl: './app-modifier.component.scss',
})
export class AppModifierComponent {
  ams = inject(AppModifierService);
  @Input() fractal!: IFractal;

  shouldRenderLevel(fractal: IFractal): boolean {
    const level = this.ams.$levels[this.ams.getNestingLevel(fractal) - 1];
    return level && level() === fractal.parent;
  }
}
