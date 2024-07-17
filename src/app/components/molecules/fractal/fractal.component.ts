import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { ControlComponent } from '@components/atoms';
import { ClickDirective } from '@directives';
import { MatTableModule } from '@mat';
import {
  ControlService,
  FetchService,
  FractalService,
  SelectService,
  SidenavService,
  TapService,
} from '@services';
import { ClickType, ControlDto, FractalDto, TapActionsNames, TapNames } from '@types';

@Component({
  selector: 'app-fractal',
  standalone: true,
  imports: [MatTableModule, ClickDirective, ControlComponent],
  templateUrl: './fractal.component.html',
  styleUrl: './fractal.component.css',
})
export class FractalComponent implements OnInit {
  @Input({ required: true }) dto!: FractalDto;

  copy: FractalDto | null = null;

  click = signal<ClickType | null>(null);
  controls = signal<ControlDto[]>([]);

  sort = computed<string[]>(() => this.cs.sort(this.fractal().controls));
  fractal = computed<FractalDto>(() => this.dto.fractals[this.fls.key()]);
  fractals = computed<FractalDto[]>(() => Object.values(this.fractal().fractals));

  constructor(
    public cs: ControlService,
    public ts: TapService,
    public fs: FetchService,
    public fls: FractalService,
    public svs: SidenavService,
    public sts: SelectService,
  ) {}

  ngOnInit(): void {
    this.ts.clicked$.subscribe(this.tapClickHandler);
  }

  onClick(dto: FractalDto): void {
    if (this.sts.has(dto)) {
      this.sts.delete(dto);
    } else {
      this.svs.state.set('Open');
      this.ts.set('Actions');
      this.sts.add(dto);
    }
  }

  private tapClickHandler = (name: TapNames | null): void => {
    if (!name) return;
    const handler: Record<TapActionsNames, () => void> = {
      Add: () => {
        this.copy = this.fls.copy(this.fractal().fractals['0']);
        this.controls.set(Object.values(this.copy.controls));
      },
      Save: () => {
        if (this.copy) {
          this.fs.fractal.add(this.copy).subscribe();
          this.copy = null;
        }
      },
      Delete: () => {
        if (this.sts.any()) {
          this.fs.fractal.delete(this.sts.selected()).subscribe();
          this.sts.clean();
        }
      },
    };
    handler[name as TapActionsNames]();
  };
}
