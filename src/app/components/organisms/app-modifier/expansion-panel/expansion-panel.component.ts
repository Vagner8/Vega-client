import { NgClass } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormComponent } from '@components/atoms';
import { MatCardModule, MatExpansionModule, MatIconModule, MatTableModule } from '@mat';
import { AppModifierService } from '@services';
import { IFractal } from '@types';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    FormComponent,
    NgClass,
  ],
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss',
})
export class ExpansionPanelComponent implements OnInit {
  ams = inject(AppModifierService);
  @Input() fractal!: IFractal;
  columns = ['indicator', 'data'];

  ngOnInit(): void {
    console.count('ExpansionPanelComponent');
    this.fractal.formRecord.disable();
  }

  afterExpand(fractal: IFractal): void {
    const level = this.ams.getNestingLevel(fractal);
    if (this.ams.$levels[level]) {
      this.ams.$levels[level].set(fractal);
    } else {
      this.ams.$levels[level] = signal(fractal);
    }
    this.ams.$current.set(fractal);
  }

  afterCollapse(fractal: IFractal): void {
    if (fractal === this.ams.$current())
      this.ams.$current.set(fractal.parent ? fractal.parent : null);
  }
}
