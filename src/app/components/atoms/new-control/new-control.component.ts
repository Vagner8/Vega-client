import { Component, Input } from '@angular/core';
import { FormRecord } from '@angular/forms';

@Component({
  selector: 'app-new-control',
  standalone: true,
  imports: [],
  templateUrl: './new-control.component.html',
})
export class NewControlComponent {
  @Input() formRecord!: FormRecord;
}
