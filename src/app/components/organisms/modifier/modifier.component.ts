import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormCardComponent } from '@components/molecules';
import { MatButtonModule, MatCardModule } from '@mat';
import { DataService, ModifiersService, SelectService } from '@services';
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
  @Input() fractal: IFractal | null = null;
  @Input() fractals: IFractal[] = [];
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.ms.hold$.subscribe(modifier => {
      switch (modifier?.cursor) {
        case Modifiers.Save:
          this.ds
            .update(this.fractal ? [this.fractal.update()] : this.fractals.map(fractal => fractal.update()))
            .subscribe();
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
