import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TableComponent } from '@components/atoms';
import { DataService, EventService, FractalService } from '@services';
import { ModifierComponent } from '../modifier/modifier.component';
import { Events, IFractal, Types } from '@types';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [TableComponent, ModifierComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements OnInit {
  @Input() Rows = '';
  @Input() Taps = '';
  @Input() Pages = '';
  @Input() Manager = '';
  @Input() Modifier = '';

  constructor(
    public fs: FractalService,
    public es: EventService,
    private ds: DataService
  ) {}

  ngOnInit(): void {
    const root = this.fs.root();
    if (root) {
      this.fs.pages = root.find(Types.Pages);
      this.fs.modifiers = root.find(Types.Modifiers);

      this.fs.root.set(root);
      this.fs.manager.set(root.find(Types.Manager));
      this.fs.page.signal.set(root.find(this.Pages));
      this.fs.taps.signal.set(this.fs[this.Taps === Types.Modifiers ? 'modifiers' : 'pages']);
      this.fs.modifier.signal.set(root.find(this.Modifier));
      this.Rows &&
        this.Rows.split(':').forEach(id => {
          const row = root.find(id);
          this.fs.rows.set(row ? row : this.fs.clone());
        });
      this.fs.managerEvent.signal.set(this.Manager || Events.Hold);
    }
  }

  async hold(): Promise<void> {
    if (this.fs.rows.signal().length) {
      this.fs.rows.unload();
    } else {
      await this.fs.rows.load(this.fs.page.signal()?.list());
      await this.fs.taps.set(this.fs.modifiers);
      this.fs.managerEvent.set(Events.Click);
    }
  }

  async touch(row: IFractal): Promise<void> {
    await this.fs.rows.set(row);
    await this.fs.taps.set(this.fs.modifiers);
    this.fs.managerEvent.set(Events.Click);
  }
}
