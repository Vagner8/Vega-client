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
import { SelectService } from '@services';
import { Fractal, AppEntities, Indicators } from '@types';
import { TableComponent } from '@components/atoms';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    TableComponent,
    TableComponent,
    NgClass,
  ],
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss',
})
export class ExpansionPanelComponent implements OnInit {
  ss = inject(SelectService);
  @Input() fractal!: Fractal;
  panel = viewChild(MatExpansionPanel);
  closed = output<Fractal>();

  indicators = Indicators;

  ngOnInit(): void {
    if (this.fractal.is(AppEntities.Root)) {
      this.ss.setCurrentFractal(this.fractal);
      this.panel()?.open();
    }
  }

  afterExpand(fractal: Fractal): void {
    this.ss.setCurrentFractal(fractal);
  }
}
