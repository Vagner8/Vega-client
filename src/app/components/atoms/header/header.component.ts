import { CommonModule } from '@angular/common';
import { Component, WritableSignal } from '@angular/core';
import { StateService } from '@services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private ss: StateService) {}

  get page(): WritableSignal<string> {
    return this.ss.page;
  }

  get executer(): WritableSignal<string> {
    return this.ss.executer;
  }
}
