import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@mat';
import { MatIcon } from '@angular/material/icon';
import { ClickDirective } from '@directives';
import { Tap } from '@types';

@Component({
  selector: 'app-executor',
  standalone: true,
  imports: [MatIcon, MatButtonModule, ClickDirective],
  templateUrl: './executor.component.html',
  styleUrl: './executor.component.css',
})
export class ExecutorComponent {
  @Input({ required: true }) tap!: Tap<string>;
}
