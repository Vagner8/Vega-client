import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  // changes = new Set<FractalDto>();
  // toggles = this.createSetting(Toggles, false);
  // selects = this.createSetting(Selects, '');
  // sortChanged(fractal: IFractal, { previousIndex, currentIndex }: CdkDragDrop<string[]>): void {
  //   const columns = fractal.array(Indicators.Sort);
  //   moveItemInArray(columns, previousIndex, currentIndex);
  //   fractal.set({ [Indicators.Sort]: columns.join(':') });
  //   this.changes.add(fractal.dto);
  // }
  // selectionChanged(fractal: IFractal, value: string): void {
  //   const select = fractal.array(Indicators.Select);
  //   const index = select.indexOf(value);
  //   if (index <= 0) return;
  //   select.splice(index, 1);
  //   select.unshift(value);
  //   fractal.set({ [Indicators.Select]: select.join(':') });
  //   this.changes.add(fractal.dto);
  // }
  // positionChanged({ target }: MouseEvent | TouchEvent, fractal: IFractal): void {
  //   if (!(target instanceof Element)) return;
  //   const closest = target.closest('[cdkDrag]');
  //   if (!closest) return;
  //   const { top, left } = closest.getBoundingClientRect();
  //   fractal.set({ [Indicators.X]: left.toString(), [Indicators.Y]: top.toString() });
  //   this.changes.add(fractal.dto);
  // }
  // private createSetting<T>(settings: object, value: T): Record<string, WritableSignal<T>> {
  //   return Object.values(settings).reduce((acc: Record<string, WritableSignal<T>>, setting) => {
  //     acc[setting] = signal(value);
  //     return acc;
  //   }, {});
  // }
}
