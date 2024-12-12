import { Component, Input, output } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { IFractal, Types } from '@types';
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
    this.ls.form.enable();
    await this.ls.addRow(this.ls.list.clone());
    this.fs.modifier.set(tap);
    this.touch.emit(tap);
    this.navigate({ [Types.Modifier]: tap.cursor });
  }
}
