import { Component, Input } from '@angular/core';
import { Fractal } from '@types';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.css',
})
export class ModifierComponent {
  @Input() fractal!: Fractal;
  @Input() modifiers!: string;
}
