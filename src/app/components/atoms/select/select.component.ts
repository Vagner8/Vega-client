import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@mat';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [MatSelectModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
})
export class SelectComponent {
  @Input() formControl!: FormControl;
  @Input() options?: string[] = [];
  @Input() label: string = '';
}
