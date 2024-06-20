import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@mat';
import { ActiveComponent } from '@components';
import { RouterOutlet } from '@angular/router';
import { StateService } from '@services';
import { Param } from '@types';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatTableModule, ActiveComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent implements OnChanges {
  @Input() Page = '';

  constructor(private ss: StateService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.ss.page.set(changes[Param.Page].currentValue);
  }
}
