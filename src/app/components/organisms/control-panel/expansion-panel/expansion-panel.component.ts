import { NgClass } from '@angular/common';
import { Component, inject, Input, OnInit, output, viewChild } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatExpansionPanel,
  MatIconModule,
  MatTableModule,
} from '@mat';
import { ControlPanelService, UpdateService } from '@services';
import { ArrayIndicators, Fractals, IFractal } from '@types';
import { CollectionComponent } from '@components/atoms';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    CollectionComponent,
    NgClass,
  ],
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss',
})
export class ExpansionPanelComponent implements OnInit {
  us = inject(UpdateService);
  cps = inject(ControlPanelService);
  @Input() fractal!: IFractal;
  panel = viewChild(MatExpansionPanel);
  closed = output<IFractal>();

  ngOnInit(): void {
    if (this.fractal.is(Fractals.Root)) {
      this.cps.$current.set(this.fractal);
      this.panel()?.open();
    }
  }

  get hasColumns(): boolean {
    return Boolean(this.fractal.data(ArrayIndicators.Columns)) && this.fractal.fractals !== null;
  }

  afterExpand(fractal: IFractal): void {
    this.cps.$current.set(fractal);
  }
}
