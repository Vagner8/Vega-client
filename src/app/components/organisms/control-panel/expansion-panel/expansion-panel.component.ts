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
import { Fractal, FractalEntities, SplitIndicators } from '@types';
import { SheetComponent } from '@components/atoms';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [MatExpansionModule, MatButtonModule, MatIconModule, MatCardModule, MatTableModule, SheetComponent, NgClass],
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss',
})
export class ExpansionPanelComponent implements OnInit {
  ss = inject(SelectService);
  @Input() fractal!: Fractal;
  panel = viewChild(MatExpansionPanel);
  closed = output<Fractal>();

  ngOnInit(): void {
    if (this.fractal.is(FractalEntities.Root)) {
      this.ss.setParent(this.fractal);
      this.panel()?.open();
    }
  }

  get hasColumns(): boolean {
    return Boolean(this.fractal.getData(SplitIndicators.Columns)) && this.fractal.fractals !== null;
  }

  afterExpand(fractal: Fractal): void {
    this.ss.setParent(fractal);
  }
}
