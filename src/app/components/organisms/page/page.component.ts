import { Component, Input, OnInit } from '@angular/core';
import { TableComponent } from '@components/atoms';
import { DataService, FractalService } from '@services';
import { ModifierComponent } from '../modifier/modifier.component';
import { Events, IFractal, Types } from '@types';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [TableComponent, ModifierComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent implements OnInit {
  @Input() Rows = '';
  @Input() Pages = '';
  @Input() Manager = '';
  @Input() Modifier = '';

  constructor(
    public fs: FractalService,
    private ds: DataService
  ) {}

  ngOnInit(): void {
    this.ds.get().subscribe(dto => {
      const root = this.fs.toFractal(dto);
      this.fs.pages = root.find(Types.Pages);
      this.fs.modifiers = root.find(Types.Modifiers);

      this.fs.root.set(root);
      this.fs.manager.set(root.find(Types.Manager));
      this.fs.page.signal.set(root.find(this.Pages));
      this.fs.taps.signal.set(this.fs[this.Rows || this.Modifier ? 'modifiers' : 'pages']);
      this.fs.modifier.signal.set(root.find(this.Modifier));
      if (this.Rows) {
        const rows = this.Rows.split(':').map(id => {
          const row = root.find(id);
          return row ? row : this.fs.clone();
        });
        this.fs.rows.signal.set(rows);
      }
      this.fs.managerEvent.signal.set(this.Manager || Events.Hold);
    });
  }

  async onRowClick(row: IFractal): Promise<void> {
    await this.fs.rows.set(row);
    await this.fs.taps.set(this.fs.modifiers);
    this.fs.managerEvent.set(Events.Click);
  }
}
