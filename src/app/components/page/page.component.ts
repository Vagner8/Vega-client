import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@mat';
import { ActiveComponent } from '@components';
import { RouterOutlet } from '@angular/router';
import { StateService, UnitService } from '@services';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatTableModule, ActiveComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {
  name = signal('');

  @Input() set Page(name: string) {
    this.name.set(name);
    this.ss.page.set(name);
    this.ss.active.set('');
  }

  constructor(
    private ss: StateService,
    private us: UnitService,
  ) {}

  // ngOnInit() {
  //   console.log('🚀 ~ this.us.dto.units[this.name()]:', this.us.dto.units[this.name()]);
  // }

  // get unit(): UnitsDto {
  //   console.log('🚀 ~ this.us.dto.units[this.name()]:', this.us.dto.units[this.name()]);
  //   return this.us.dto.units[this.name()].units;
  // }
}
