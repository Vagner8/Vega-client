import { Component, computed, Input, output } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { IFractal } from '@types';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [TapComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent extends SuperComponent {
  @Input() tap!: IFractal;
  touch = output<IFractal>();
  disabled = computed(() => this.rs.list().length === 0);

  editTouched(tap: IFractal): void {
    this.rs.form.enable();
    this.touch.emit(tap);
  }
}
