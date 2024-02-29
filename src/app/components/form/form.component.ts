import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@mat';
import { ActionsStateService } from '@services';

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

  constructor(private _actionsStateService: ActionsStateService) {}

  ngOnInit() {
    this.formGroup.valueChanges.subscribe((values) => {
      this._actionsStateService.setOk({
        disabled: !Object.values(values).some(Boolean),
      });
    });
  }

  onSubmitEvent(): void {
    this.submitEvent.emit();
  }

  get controlInputs(): [string, FormControl][] {
    return Object.entries(this.formGroup.controls) as [string, FormControl][];
  }
}
