import { Component, inject, Input, output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TapComponent } from '@components/atoms';
import { AppModifierService, CollectionsService, ModifiersService, RowsService } from '@services';
import { IFractal, Modifiers } from '@types';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [TapComponent],
  templateUrl: './new.component.html',
})
export class NewComponent {
  rs = inject(RowsService);
  ms = inject(ModifiersService);
  cs = inject(CollectionsService);
  ams = inject(AppModifierService);
  touch = output<IFractal>();
  @Input() tap!: IFractal;

  async newTouched(tap: IFractal): Promise<void> {
    if (this.cs.$current()?.is(Modifiers.App)) {
      this.ams.current.formRecord.enable();
      this.ams.current.formRecord.addControl('Indicator', new FormControl(''));
      this.ams.current.formRecord.addControl('Data', new FormControl(''));
      console.log('🚀 ~ this.ams.current:', this.ams.current);
    } else {
      this.cs.current.formArray.enable();
      this.touch.emit(tap);
      await this.ms.set(tap);
      this.rs.set(this.cs.current.cloneChild());
    }
  }
}
