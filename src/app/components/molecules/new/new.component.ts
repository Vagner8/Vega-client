import { Component, inject, Input, output } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { CollectionsService, ModifiersService, RowsService } from '@services';
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
  touch = output<IFractal>();
  @Input() tap!: IFractal;

  async newTouched(tap: IFractal): Promise<void> {
    // if (this.cs.current.is(Modifiers.App)) {
    //   this.ms.currentTouched$.next(tap);
    //   this.ms.$current.set(tap);
    // } else {
    //   this.cs.current.formArray.enable();
    //   await this.rs.set(this.cs.current.cloneChild());
    //   this.touch.emit(tap);
    // }
  }
}
