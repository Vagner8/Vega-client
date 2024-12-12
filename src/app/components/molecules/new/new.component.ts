import { Component, Input, output } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { FractalsParams, IFractal } from '@types';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [TapComponent],
  templateUrl: './new.component.html',
})
export class NewComponent extends SuperComponent {
  @Input() tap!: IFractal;
  touch = output<IFractal>();

  async newTouch(tap: IFractal): Promise<void> {
    this.ls.rowsForm.enable();
    await this.ls.addRow(this.ls.list.clone());
    this.ms.$modifier.set(tap);
    this.touch.emit(tap);
    this.navigate({ [FractalsParams.Modifier]: tap.cursor });
  }
}
