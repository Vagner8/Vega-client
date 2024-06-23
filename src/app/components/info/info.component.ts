import { CommonModule } from '@angular/common';
import { Component, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { StateService } from '@services';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent {
  classExpression = {
    btn: true,
  };

  constructor(private ss: StateService) {}

  isFetching(): WritableSignal<boolean> {
    return this.ss.isFetching;
  }
}
