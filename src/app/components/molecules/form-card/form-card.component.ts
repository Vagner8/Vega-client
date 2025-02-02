import { Component, Input, output } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@mat';
import { Fractal } from '@types';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [MatCardModule, FormComponent, MatButtonModule],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.scss',
})
export class FormCardComponent {
  @Input() fractal!: Fractal;
  @Input() showCancelButton = true;
  cancel = output();

  ngOnInit(): void {
    console.log('🚀 ~ fractal:', this.fractal);
  }
}
