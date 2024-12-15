import { Component, computed, inject, Input, output } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { ListService, RowsService } from '@services';
import { IFractal } from '@types';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [TapComponent],
  templateUrl: './edit.component.html',
})
export class EditComponent {
  rs = inject(RowsService);
  ls = inject(ListService);
  @Input() tap!: IFractal;
  touch = output<IFractal>();
  disabled = computed(() => this.rs.$rows().length === 0);

  editTouched(tap: IFractal): void {
    this.ls.list.formArray.enable();
    this.touch.emit(tap);
  }
}
