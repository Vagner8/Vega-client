import { Component, Input } from '@angular/core';
import { MatExpansionModule, MatIconModule } from '@mat';
import { FormCardComponent } from '@components/molecules';
import { IFractal } from '@types';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule, FormCardComponent],
  templateUrl: './app-modifier.component.html',
  styleUrl: './app-modifier.component.scss',
})
export class AppModifierComponent {
  @Input() fractals: IFractal[] = [];

  afterExpand(fractal: IFractal): void {
    console.log('🚀 ~ fractal:', fractal);
  }
}
