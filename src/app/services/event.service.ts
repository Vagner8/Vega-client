import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IFractal, Indicators } from '@types';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  hold$ = new Subject<void>();
  holdRun$ = new Subject<void>();
  holdCancel$ = new Subject<void>();

  dragStarted$ = new Subject<void>();
  disableFormGroups$ = new BehaviorSubject(false);

  private ds = inject(DataService);

  dropRows(fractal: IFractal | null, { previousIndex, currentIndex }: CdkDragDrop<string>): void {
    if (!fractal) return;
    const list = fractal.list();
    moveItemInArray(list, previousIndex, currentIndex);
    list.forEach((item, index) => {
      if (fractal.fractals && fractal.dto.fractals) {
        const position = `${index + 1}`;
        item.cursor = position;
        item.dto.controls[Indicators.Position].data = position;
        fractal.fractals[position] = item;
        fractal.dto.fractals[position] = item.dto;
      }
    });
    this.ds.update([fractal.dto]).subscribe();
  }
}
