import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IFractal, Indicators } from '@types';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  holdRun$ = new Subject<void>();
  holdEnd$ = new Subject<void>();

  private ds = inject(DataService);

  dropRows(fractal: IFractal | null, { previousIndex, currentIndex }: CdkDragDrop<string>): void {
    if (!fractal) return;
    const list = fractal.fractalsArray;
    moveItemInArray(list, previousIndex, currentIndex);
    list.forEach((item, index) => {
      if (fractal.fractals && fractal.dto.fractals) {
        const position = `${index + 1}`;
        item.dto.controls[Indicators.Position].data = position;
        fractal.fractals[position] = item;
        fractal.dto.fractals[position] = item.dto;
      }
    });
    this.ds.update([fractal.dto]).subscribe();
  }
}
