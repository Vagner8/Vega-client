import { Component, Input, output } from '@angular/core';
import { FormComponent } from '@components/atoms';
import { MatButtonModule, MatCardModule } from '@mat';
import { Fractal } from '@types';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [MatCardModule, FormComponent, MatButtonModule],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.scss',
})
export class FormCardComponent {
  @Input() title = '';
  @Input() fractal!: Fractal;
  @Input() subtitle = '';
  @Input() showCancelButton = true;
  cancel = output();
}
