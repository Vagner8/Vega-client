import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { ListComponent } from '@components/atoms';
import { Events, Fractals, IFractal, Modifiers } from '@types';
import {
  BaseService,
  FractalService,
  ListService,
  ManagerService,
  ModifiersService,
  RowsService,
  TapsService,
} from '@services';
import { AppModifierComponent } from '../app-modifier/app-modifier.component';
import { RowsModifierComponent } from '../rows-modifier/rows-modifier.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [ListComponent, AppModifierComponent, RowsModifierComponent],
  templateUrl: './page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements OnInit {
  bs = inject(BaseService);
  ts = inject(TapsService);
  ls = inject(ListService);
  rs = inject(RowsService);
  fs = inject(FractalService);
  ms = inject(ModifiersService);
  mgr = inject(ManagerService);

  @Input() Taps = '';
  @Input() Rows = '';
  @Input() Lists = '';
  @Input() Manager = '';
  @Input() Modifier = '';

  ngOnInit(): void {
    this.init();
  }

  async rowHeld(list: IFractal): Promise<void> {
    await this.rs.hold(list);
    this.openSidenav();
  }

  async rowTouched(row: IFractal): Promise<void> {
    await this.rs.set(row);
    this.openSidenav();
  }

  private openSidenav(): void {
    if (this.mgr.$event() !== Events.Touch) {
      this.mgr.set(Events.Touch);
    }
    if (this.ts.$taps()?.is(Fractals.Lists)) {
      this.ts.set(this.ms.modifiers);
    }
  }

  private init(): void {
    const { Rows, Taps, Lists, Manager, Modifier } = this;
    this.ls.init({ Lists });
    this.rs.init({ Rows, list: this.ls.list });
    this.ms.init({ Modifier });
    this.ts.init({ Taps, lists: this.ls.lists, modifiers: this.ms.modifiers });
    this.mgr.init({ Manager });
    [Modifiers.Delete, Modifiers.Save].some(modifier => modifier === Modifier) &&
      this.ls.list.formArray.disable();
  }
}
