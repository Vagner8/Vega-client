import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ControlsComponent } from '@components/atoms';
import { ArrayPipe } from '@pipes';
import { FractalService, RouterService } from '@services';
import { FractalDto } from '@types';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [CommonModule, ControlsComponent, ArrayPipe],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.css',
})
export class ModifierComponent implements OnInit {
  fractals: FractalDto[] = [];

  constructor(
    public rs: RouterService,
    private fls: FractalService,
  ) {}

  ngOnInit() {
    if (!this.fls.hasSelected()) {
      const fractals = this.fls.find(this.rs.queryParams().ids || '');
      this.fls.selected.set(fractals);
    }
    this.fractals = this.fls.selected();
  }
}
