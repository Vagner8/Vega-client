import { Injectable } from '@angular/core';
import { FractalDto, IFractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  update({ rows, parent }: { rows: IFractal[]; parent: IFractal }): {
    toAdd: FractalDto[];
    toUpdate: FractalDto[];
  } {
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

    return {
      toAdd,
      toUpdate,
    };
  }
}
