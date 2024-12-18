import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatCardModule, MatExpansionModule, MatIconModule, MatTableModule } from '@mat';
import { AppModifierService } from '@services';
import { IFractal } from '@types';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule, MatCardModule, MatTableModule, NgClass],
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss',
})
export class ExpansionPanelComponent {
  ams = inject(AppModifierService);
  @Input() fractal!: IFractal;
  columns = ['indicator', 'data'];

  afterExpand(fractal: IFractal): void {
    this.ams.$current.set(fractal);
  }

  afterCollapse(fractal: IFractal): void {
    this.ams.$current.set(fractal.parent ? fractal.parent : null);
  }
}
