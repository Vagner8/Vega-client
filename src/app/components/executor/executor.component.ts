import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Tap } from '@types';

@Component({
  selector: 'app-executor',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './executor.component.html',
  styleUrl: './executor.component.css',
})
export class ExecutorComponent {
  tap!: Tap;
}
