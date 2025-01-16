import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormCardComponent } from '@components/molecules';
import { fractalFactory } from '@fractal';
import { MatButtonModule, MatCardModule } from '@mat';
import { ControlPanelService, DataService, ModifiersService, SelectService } from '@services';
import { IFractal, Modifiers } from '@types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, FormCardComponent],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.scss',
})
export class ModifierComponent implements OnInit, OnDestroy {
  ds = inject(DataService);
  ss = inject(SelectService);
  ms = inject(ModifiersService);
  cps = inject(ControlPanelService);
  private subs: Subscription[] = [];

  ngOnInit(): void {
    const fractal = this.ss.$fractal();
    const fractals = this.ss.$fractals();
    this.subs.push(
      this.ms.hold$.subscribe(modifier => {
        switch (modifier?.cursor) {
          case Modifiers.Save:
            this.ds.update(fractal ? [fractal.update()] : fractals.map(fractal => fractal.update())).subscribe();
            break;
        }
      })
    );

    this.subs.push(
      this.ms.touch$.subscribe(modifier => {
        switch (modifier?.cursor) {
          case Modifiers.New:
            this.cps.$fractal();
            console.log('🚀 ~ this.cps.$fractal():', this.cps.fractal.createChild());
            this.ss.push(this.cps.fractal.createChild());
            break;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
