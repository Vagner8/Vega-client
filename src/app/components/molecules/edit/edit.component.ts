import { Component, computed, inject, Input, output } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { CollectionsService, RowsService } from '@services';
import { IFractal } from '@types';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [TapComponent],
  templateUrl: './edit.component.html',
})
export class EditComponent {
  rs = inject(RowsService);
  cs = inject(CollectionsService);
  @Input() tap!: IFractal;
  touch = output<IFractal>();
  disabled = computed(() => this.rs.$rows().length === 0);

  editTouched(tap: IFractal): void {
    this.cs.collection.formArray.enable();
    this.touch.emit(tap);
  }
}
