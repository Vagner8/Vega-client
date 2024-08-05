import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { ControlsComponent } from '@components/atoms';
import { ArrayPipe } from '@pipes';
import { FractalService, RouterService, StateService } from '@services';
import { FractalDto } from '@types';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [CommonModule, ControlsComponent, ArrayPipe],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.css',
})
export class ModifierComponent {
  fractals = computed<FractalDto[]>(() => (this.fls.data() ? this.fls.find(this.rs.params()) : []));

  constructor(
    public rs: RouterService,
    public fls: FractalService,

    private ss: StateService,
  ) {}

  ngOnInit(): void {}
}
