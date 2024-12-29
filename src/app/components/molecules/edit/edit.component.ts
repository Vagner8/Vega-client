import { Component, inject, Input, output } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { CollectionsService, ModifiersService } from '@services';
import { IFractal } from '@types';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [TapComponent],
  templateUrl: './edit.component.html',
})
export class EditComponent {
  ms = inject(ModifiersService);
  cs = inject(CollectionsService);
  @Input() tap!: IFractal;
  touch = output<IFractal>();

  editTouched(tap: IFractal): void {
    this.touch.emit(tap);
  }
}
