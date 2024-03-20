import { CommonModule } from '@angular/common';
import { Component, WritableSignal } from '@angular/core';
import { ParamMap } from '@angular/router';
import { StateService } from '@services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private _state: StateService) {}

  get paramMap(): WritableSignal<ParamMap | null> {
    return this._state.paramMap;
  }
}
