import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StateService } from '@services';
import { Param } from '@types';
import { ControlComponent } from '@components/molecules';

@Component({
  selector: 'app-active',
  standalone: true,
  imports: [ControlComponent],
  templateUrl: './active.component.html',
  styleUrl: './active.component.css',
})
export class ActiveComponent implements OnChanges {
  @Input() Active = '';

  constructor(private ss: StateService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.ss.executer.set(changes[Param.Active].currentValue);
  }
}
