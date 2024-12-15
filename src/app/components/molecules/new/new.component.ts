import { Component, inject, Input, output } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { ListService, ModifiersService, RowsService } from '@services';
import { IFractal } from '@types';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [TapComponent],
  templateUrl: './new.component.html',
})
export class NewComponent {
  ls = inject(ListService);
  rs = inject(RowsService);
  ms = inject(ModifiersService);

  @Input() tap!: IFractal;
  touch = output<IFractal>();

  async newTouch(tap: IFractal): Promise<void> {
    this.ls.list.formArray.enable();
    await this.rs.set(this.ls.list.clone());
    this.ms.set(tap);
    this.touch.emit(tap);
  }
}
