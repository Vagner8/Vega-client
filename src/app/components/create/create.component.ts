import { Component, Input } from '@angular/core';
import { ControlService } from '@services';
import { ControlComponent } from '../control/control.component';
import { ControlItem } from '@types';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ControlComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  @Input() address: [string, string] | null = null;

  constructor(private _control: ControlService) {
    this._control.add();
  }

  get controls(): ControlItem[][] {
    return this._control.controls;
  }

  onClick() {
    this._control.add();
  }
}
