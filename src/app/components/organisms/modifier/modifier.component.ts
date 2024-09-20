import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ControlsComponent } from '@components/atoms';
import { FractalService, NavigateService } from '@services';
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

  constructor(
    public ns: NavigateService,
    private fls: FractalService
  ) {}

  // ngOnInit() {
  //   if (!this.fls.hasSelected()) {
  //     const fractals = this.fls.find(this.ns.queryParams().ids || '');
  //     this.fls.selected.set(fractals);
  //   }
  //   this.fractals = this.fls.selected();
  // }
}
