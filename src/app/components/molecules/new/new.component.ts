import { Component, Input, output } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { IFractal } from '@types';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [TapComponent],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
})
export class NewComponent extends SuperComponent {
  @Input() tap!: IFractal;
  touch = output<IFractal>();

  async newTouch(tap: IFractal): Promise<void> {
    this.rs.form.enable();
    const table = this.fs.table();
    table && this.rs.add(table.clone());
    this.touch.emit(tap);
  }
}
