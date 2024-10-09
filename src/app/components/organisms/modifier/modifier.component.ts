import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ControlsComponent } from '@components/atoms';
import { StateService } from '@services';
import { FractalDto } from '@types';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [CommonModule, ControlsComponent],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.css',
})
export class ModifierComponent {
  fractals: FractalDto[] = [];

  constructor(public ss: StateService) {}

  // ngOnInit() {
  //   if (!this.fls.hasSelected()) {
  //     const fractals = this.fls.find(this.ns.queryParams().ids || '');
  //     this.fls.selected.set(fractals);
  //   }
  //   this.fractals = this.fls.selected();
  // }
}
