import { Component, computed, Input, output } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { IFractal } from '@types';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [TapComponent],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css',
})
export class DeleteComponent extends SuperComponent {
  @Input() tap!: IFractal;
  touch = output<IFractal>();
  disabled = computed(() => this.rs.list().length === 0);

  deleteTouched(tap: IFractal): void {
    this.rs.form.disable();
    this.touch.emit(tap);
  }
}
