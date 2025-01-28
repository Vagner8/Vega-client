import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CollectionComponent } from '@components/atoms';
import { Events, FractalEntities } from '@types';
import { ManagerService, ModifiersService, TapsService, SelectService } from '@services';
import { ModifierComponent } from '../modifier/modifier.component';
import { ControlPanelComponent } from '../control-panel/control-panel.component';
import { BaseService } from 'app/services/base.service';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [CollectionComponent, ControlPanelComponent, ModifierComponent],
  templateUrl: './screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenComponent implements OnInit {
  bs = inject(BaseService);
  ts = inject(TapsService);
  ss = inject(SelectService);
  ms = inject(ModifiersService);
  mgr = inject(ManagerService);

  @Input() Taps = '';
  @Input() Rows = '';
  @Input() Manager = '';
  @Input() Modifiers = '';
  @Input() Collections = '';

  ngOnInit(): void {
    this.init();
  }

  private openSidenav(): void {
    if (this.mgr.$event() !== Events.Touch) {
      this.mgr.set(Events.Touch);
    }
    if (this.ts.$taps()?.is(FractalEntities.Collections)) {
      // this.ts.set(this.ms.parent);
    }
  }

  private init(): void {
    const { Taps, Collections, Manager, Modifiers } = this;
    const root = this.bs.$root()!;
    this.ss.init({ root, Collections });
    this.ms.init({ root, Modifiers });
    this.ts.init({
      Taps,
      modifiers: this.ms.modifiers,
      collections: this.bs.collections,
    });
    this.mgr.init({ Manager });
    // [Modifiers.Delete, Modifiers.Save].some(modifier => modifier === Modifier)
    // && this.cs.current.formArray.disable();
  }
}
