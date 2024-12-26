import { Component, inject, Input, viewChild } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@mat';
import { AppModifierService, ModifiersService } from '@services';
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
  ms = inject(ModifiersService);
  ams = inject(AppModifierService);
  @Input() fractal!: IFractal;

  accordion = viewChild(MatAccordion);

  shouldRenderLevel(fractal: IFractal): boolean {
    const level = this.ams.$levels[this.ams.getNestingLevel(fractal) - 1];
    return level && level() === fractal.parent;
  }

  closed(): void {
    const current = this.ams.$current();
    this.ams.$current.set(current?.parent ? current.parent : null);
    this.accordion()?.closeAll();
    this.ms.currentTouched$.next(null);
  }
}
