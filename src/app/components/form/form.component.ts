import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@mat';
import { BtnActService } from '@services';
import { ActiveBtnActName } from '@types';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [InputComponent, MatButtonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Output() submitEvent = new EventEmitter();

  constructor(private _btnActs: BtnActService) {}

  ngOnInit() {
    this.formGroup.valueChanges.subscribe((values) => {
      const sendBtnAct = this._btnActs.getActive(ActiveBtnActName.Send);
      sendBtnAct.signal.update((state) => ({
        ...state,
        disabled: !Object.values(values).some(Boolean),
      }));
    });
  }

  onSubmitEvent(): void {
    this.submitEvent.emit();
  }

  get controlInputs(): [string, FormControl][] {
    return Object.entries(this.formGroup.controls) as [string, FormControl][];
  }
}
