import { Component, Input, output } from '@angular/core';
import { TapComponent } from '../../atoms/tap/tap.component';
import { IFractal } from '@types';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-save',
  standalone: true,
  imports: [TapComponent],
  templateUrl: './save.component.html',
  styleUrl: './save.component.css',
})
export class SaveComponent extends SuperComponent {
  @Input() tap!: IFractal;
  @Input() disabled!: boolean;
  touch = output<IFractal>();

  saveTouched(tap: IFractal): void {
    this.rs.form.disable();
    this.touch.emit(tap);
  }
}
