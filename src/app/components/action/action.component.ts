import { Component } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ControlComponent } from '@components';
import { MatrixService } from '@services';
import { Control } from '@types';

@Component({
  selector: 'app-action',
  standalone: true,
  imports: [ControlComponent],
  templateUrl: './action.component.html',
  styleUrl: './action.component.css'
})
export class ActionComponent {
  constructor(private matrix: MatrixService) {}
}
