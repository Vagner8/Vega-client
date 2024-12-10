import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TableComponent } from '@components/atoms';
import { ModifierComponent } from '../modifier/modifier.component';
import { SuperComponent } from '@utils';
import { Events, IFractal, Types } from '@types';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [TableComponent, ModifierComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent extends SuperComponent implements OnInit {
  @Input() Taps = '';
  @Input() Pages = '';
  @Input() Rows = '';
  @Input() Manager = '';
  @Input() Modifier = '';

  ngOnInit(): void {
    const table = this.fs.pages.find(this.Pages);
    this.fs.taps.set(this.Taps === Types.Pages ? this.fs.pages : this.fs.modifiers);
    this.rs.init(this.Rows, table);
    this.fs.table.set(table);
    this.fs.modifier.set(this.Modifier ? this.fs.modifiers.find(this.Modifier) : null);
    this.fs.managerEvent.set(this.Manager);
  }

  hold(): void {
    this.rs.hold(this.fs.table());
  }

  async rowTouched(row: IFractal): Promise<void> {
    await this.rs.add(row);
    if (this.fs.managerEvent() !== Events.Touch) {
      this.fs.managerEvent.set(Events.Touch);
      await this.navigate({ [Types.Manager]: Events.Touch });
    }
    if (this.fs.taps()?.is(Types.Pages)) {
      this.fs.taps.set(this.fs.modifiers);
      await this.navigate({ [Types.Taps]: Types.Modifiers });
    }
  }

  deleteRow(touchedRow: IFractal): void {
    this.rs.remove(touchedRow);
  }
}
