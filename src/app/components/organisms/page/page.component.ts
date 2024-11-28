import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TableComponent } from '@components/atoms';
import { DataService, FractalService } from '@services';
import { ModifierComponent } from '../modifier/modifier.component';
import { Events, IFractal, Indicators, Types } from '@types';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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

  drop({ previousIndex, currentIndex }: CdkDragDrop<string[]>): void {
    const page = this.fs.page.signal();
    if (!page) return;
    const columns = page.sort();
    moveItemInArray(columns, previousIndex, currentIndex);
    page.dto.controls[Indicators.Sort].data = columns.join(':');
    const { id, parentId, controls } = page.dto;
    this.ds.edit([{ id, parentId, fractals: null, controls }]).subscribe();
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
