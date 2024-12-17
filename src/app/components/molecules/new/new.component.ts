import { Component, inject, Input, output } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { CollectionsService, ModifiersService, RowsService } from '@services';
import { IFractal } from '@types';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [TapComponent],
  templateUrl: './new.component.html',
})
export class NewComponent {
  cs = inject(CollectionsService);
  rs = inject(RowsService);
  ms = inject(ModifiersService);

  @Input() tap!: IFractal;
  touch = output<IFractal>();

  async newTouched(tap: IFractal): Promise<void> {
    this.cs.collection.formArray.enable();
    this.touch.emit(tap);
    await this.ms.set(tap);
    this.rs.set(this.cs.collection.cloneChild());
  }
}
