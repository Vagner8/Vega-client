import { Component, Input, computed, signal } from '@angular/core';
import { ControlComponent } from '@components/atoms';
import { ClickDirective } from '@directives';
import { MatTableModule } from '@mat';
import { ControlService, FractalService, SidenavService, TapService } from '@services';
import { ClickType, ControlDto, FractalDto } from '@types';

@Component({
  selector: 'app-fractal',
  standalone: true,
  imports: [MatTableModule, ClickDirective, ControlComponent],
  templateUrl: './fractal.component.html',
  styleUrl: './fractal.component.css',
})
export class FractalComponent {
  @Input({ required: true }) dto!: FractalDto;

  sort = computed<string[]>(() => this.cs.sort(this.fractal().controls));
  click = signal<ClickType | null>(null);
  fractal = computed<FractalDto>(() => this.dto.fractals[this.fls.name()]);
  fractals = computed<FractalDto[]>(() => Object.values(this.fractal().fractals));
  controls = computed<ControlDto[]>(() => []);

  constructor(
    private cs: ControlService,
    private ts: TapService,
    public fls: FractalService,
    public svs: SidenavService,
  ) {}

  onClick(dto: FractalDto): void {
    if (this.fls.has(dto)) {
      this.fls.delete(dto);
    } else {
      this.svs.state.set('Open');
      this.ts.setView('Actions');
      this.fls.add(dto);
    }
  }

  areControls(): boolean {
    return this.controls().length > 0;
  }
}
