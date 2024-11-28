import { Injectable, signal } from '@angular/core';
import { ControlsDto, IFractal, Indicators } from '@types';
import { Fractal, PageState, ModifierState, TapsState, ManagerState, RowsState } from '@utils';
import { v4 } from 'uuid';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  pages: IFractal | null = null;
  modifiers: IFractal | null = null;

  root = signal<IFractal | null>(null);
  manager = signal<IFractal | null>(null);
  formGroupChanges = signal<IFractal | null>(null);

  page = new PageState();
  taps = new TapsState();
  rows = new RowsState();
  modifier = new ModifierState();
  managerEvent = new ManagerState();

  constructor(private cs: CrudService) {}

  clone(): Fractal {
    const parent = this.page.signal();
    if (!parent) throw new Error('No parent fractal found to clone.');
    const index = (parent.list().length + this.rows.signal().length + 1).toString();
    const cloneId = v4();

    const row = new Fractal(
      {
        id: cloneId,
        parentId: parent.dto.id,
        controls: parent.sort().reduce((acc: ControlsDto, indicator) => {
          acc[indicator] = {
            id: v4(),
            parentId: cloneId,
            indicator,
            data: indicator === Indicators.Position ? index : '',
          };
          return acc;
        }, {}),
        fractals: null,
      },
      null
    );
    row.cursor = index;
    row.isClone = true;
    return row;
  }

  update(): void {
    this.cs.update(this.rows.signal(), this.page.signal());
    this.reset();
  }

  delete(): void {
    this.cs.delete(this.rows.signal(), this.page.signal());
    this.reset();
  }

  async reset(page?: IFractal | null): Promise<void> {
    await this.page.set(page || this.page.signal());
    await this.modifier.set(null);
    this.rows.signal.set([]);
    this.formGroupChanges.set(null);
  }
}
