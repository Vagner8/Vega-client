import { Component, Input } from '@angular/core';
import { FormComponent } from '@components/atoms';
import { MatCardModule } from '@mat';
import { IFractal } from '@types';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [MatCardModule, FormComponent],
  templateUrl: './form-card.component.html',
})
export class FormCardComponent {
  @Input() fractal!: IFractal;
}
