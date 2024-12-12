import { Component, computed, Input, output } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { IFractal } from '@types';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [TapComponent],
  templateUrl: './edit.component.html',
})
export class EditComponent extends SuperComponent {
  @Input() tap!: IFractal;
  touch = output<IFractal>();
  disabled = computed(() => this.ls.$rows().length === 0);

  editTouched(tap: IFractal): void {
    this.ls.rowsForm.enable();
    this.touch.emit(tap);
  }
}
