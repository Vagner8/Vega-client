import { Component, inject, Input, output } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { ListService, ModifiersService } from '@services';
import { IFractal } from '@types';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [TapComponent],
  templateUrl: './new.component.html',
})
export class NewComponent {
  ls = inject(ListService);
  ms = inject(ModifiersService);

  @Input() tap!: IFractal;
  touch = output<IFractal>();

  async newTouch(tap: IFractal): Promise<void> {
    this.ls.rowsForm.enable();
    await this.ls.addRow(this.ls.list.clone());
    this.ms.set(tap);
    this.touch.emit(tap);
  }
}
