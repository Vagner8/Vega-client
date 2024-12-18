import { NgClass } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormComponent } from '@components/atoms';
import { MatCardModule, MatExpansionModule, MatIconModule } from '@mat';
import { AppModifierService } from '@services';
import { IFractal } from '@types';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule, MatCardModule, FormComponent, NgClass],
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss',
})
export class ExpansionPanelComponent implements OnInit {
  ams = inject(AppModifierService);
  @Input() fractal!: IFractal;

  ngOnInit(): void {
    this.fractal.formRecord.disable();
  }

  afterExpand(fractal: IFractal): void {
    this.ams.$current.set(fractal);
  }

  afterCollapse(fractal: IFractal): void {
    this.ams.$current.set(fractal.parent ? fractal.parent : null);
  }
}
