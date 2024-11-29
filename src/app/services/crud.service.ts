import { Injectable } from '@angular/core';
import { FractalDto, IFractal } from '@types';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private ds: DataService) {}

  update(rows: IFractal[], parent: IFractal | null): void {
    if (!parent || rows.length === 0) return;
    const toAdd: FractalDto[] = [];
    const toUpdate: FractalDto[] = [];
    rows.forEach(row => {
      if (row.isClone) {
        row.isClone = false;
        if (parent.fractals) parent.fractals[row.cursor] = row;
        else parent.fractals = { [row.cursor]: row };
        toAdd.push(row.update());
      } else {
        toUpdate.push(row.update());
      }
    });

    if (toAdd.length > 0) {
      this.ds.add(toAdd).subscribe(data => console.log('🚀 ~ add:', data));
    }
    if (toUpdate.length > 0) {
      this.ds.update(toUpdate).subscribe(data => console.log('🚀 ~ update:', data));
    }
  }

  delete(rows: IFractal[], parent: IFractal | null): void {
    if (!parent || rows.length === 0) return;
    const toDelete: FractalDto[] = [];
    const fractals = parent.fractals;
    if (!fractals) return;
    for (const row of rows) {
      toDelete.push(row.dto);
      delete fractals[row.cursor];
    }
    this.ds.delete(toDelete).subscribe(data => console.log('🚀 ~ delete:', data));
  }
}
