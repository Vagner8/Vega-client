import { Component, Input, output } from '@angular/core';
import { FormRecord } from '@angular/forms';
import { FormComponent } from '@components/atoms';
import { MatButtonModule, MatCardModule } from '@mat';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [MatCardModule, FormComponent, MatButtonModule],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.scss',
})
export class FormCardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() formRecord!: FormRecord;
  @Input() showCancelButton = true;
  cancel = output();
}
