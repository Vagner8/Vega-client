import { Component, computed, inject, Input, viewChild } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@mat';
import { Collections, IFractal } from '@types';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { ControlPanelService, SelectService } from '@services';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [MatExpansionModule, ExpansionPanelComponent],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss',
})
export class ControlPanelComponent {
  ss = inject(SelectService);
  cps = inject(ControlPanelService);
  @Input() fractal!: IFractal;
  accordion = viewChild(MatAccordion);

  shouldRender = computed(() => {
    if (this.fractal.is(Collections)) return false;
    let current = this.cps.$fractal();
    while (current) {
      if (current === this.fractal) return true;
      current = current.parent;
    }
    return false;
  });

  closed(): void {
    this.ss.reset();
    this.cps.$fractal.set(this.cps.fractal.parent);
    this.accordion()?.closeAll();
  }
}
