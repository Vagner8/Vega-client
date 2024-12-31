import { Injectable, signal } from '@angular/core';
import { IFractal } from '@types';
import { BaseService } from './base.service';
import { FormArray, FormRecord } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UpdateService extends BaseService {
  $currents = signal<IFractal[]>([]);
  formArray = new FormArray<FormRecord>([]);

  set(fractals: IFractal[] | null | undefined): void {
    if (!fractals) {
      this.$currents.set([]);
    } else {
      for (const fractal of fractals) {
        this.$currents.update(prev => {
          const index = prev.indexOf(fractal);
          if (index >= 0) {
            this.formArray.removeAt(index);
            return prev.filter(fractal => fractal !== fractal);
          } else {
            const withForm = fractal.setFrom();
            withForm.form && this.formArray.push(withForm.form);
            return [...prev, withForm];
          }
        });
      }
    }
  }
}
