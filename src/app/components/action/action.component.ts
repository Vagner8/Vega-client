import { Component } from '@angular/core';
import { ControlComponent } from '@components';

@Component({
  selector: 'app-action',
  standalone: true,
  imports: [ControlComponent],
  templateUrl: './action.component.html',
  styleUrl: './action.component.css',
})
export class ActionComponent {}
