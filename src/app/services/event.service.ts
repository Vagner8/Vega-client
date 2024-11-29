import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
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

  disableFormGroups$ = new BehaviorSubject(false);

  constructor(private ds: DataService) {}

  drop(fractal: IFractal | null, { previousIndex, currentIndex }: CdkDragDrop<string[]>): void {
    if (!fractal) return;
    const columns = fractal.sort();
    moveItemInArray(columns, previousIndex, currentIndex);
    fractal.dto.controls[Indicators.Sort].data = columns.join(':');
    const { id, parentId, controls } = fractal.dto;
    this.ds.update([{ id, parentId, fractals: null, controls }]).subscribe();
  }

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
