import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputComponent, SelectComponent } from '@components/atoms';
import { ControlDto } from '@types';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [InputComponent, SelectComponent],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css',
})
export class ControlsComponent {
  @Input() controls: ControlDto[] = [];

  form = new FormGroup({});

  formControl({ data, indicator }: ControlDto): FormControl<string | null> {
    const formControl = new FormControl(data);
    this.form.addControl(indicator, formControl);
    return formControl;
  }
}
