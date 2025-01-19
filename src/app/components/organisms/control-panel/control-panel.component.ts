import { Component, computed, inject, Input, viewChild } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@mat';
import { Collections, IFractal } from '@types';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { SelectService } from '@services';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [MatExpansionModule, ExpansionPanelComponent],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss',
})
export class ControlPanelComponent {
  ss = inject(SelectService);
  @Input() fractal!: IFractal;
  accordion = viewChild(MatAccordion);

  shouldRender = computed(() => {
    if (this.fractal.is(Collections)) return false;
    let current = this.ss.$parent();
    while (current) {
      if (current === this.fractal) return true;
      current = current.parent;
    }
    return false;
  });

  closed(): void {
    this.ss.reset();
    this.ss.setParent(this.ss.$parent()?.parent || null);
    this.accordion()?.closeAll();
  }
}
