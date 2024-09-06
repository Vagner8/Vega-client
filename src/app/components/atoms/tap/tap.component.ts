import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ClickDirective } from '@directives';
import { ControlService, RouterService } from '@services';
import { ControlsData, FractalDto } from '@types';
import { isFractalPagesNames } from '@utils';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [MatIcon, MatButtonModule, ClickDirective],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.css',
})
export class TapComponent implements OnInit {
  @Input() tap!: FractalDto;

  data!: ControlsData;

  constructor(
    private rs: RouterService,
    private cs: ControlService,
  ) {}

  ngOnInit(): void {
    this.data = this.cs.parse(this.tap.controls);
    console.log('🚀 ~ this.data:', this.data);
  }

  onClick() {
    const page = this.data.Fractal;
    console.log('🚀 ~ page:', page);
    console.log('🚀 ~ isFractalPagesNames(page):', isFractalPagesNames(page));

    this.rs.navigate(isFractalPagesNames(page) ? page : null);
  }
}
