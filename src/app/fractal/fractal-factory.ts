import {
  FractalDto,
  Fractal,
  Fractals,
  ControlDto,
  Indicators,
  SplitIndicators,
  FractalForm,
  ControlDtoFormsFields,
  ControlFormsFields,
  AppEntities,
  AppCollections,
} from '@types';
import { FractalDtoFactory } from './fractal-dto-factory';
import { checkValue, createForm } from '@utils';
import { findFractalRecursively } from 'app/utils/getters';
import { FormRecord } from '@angular/forms';

export class FractalFactory implements Fractal {
  dto: FractalDto;
  form: FractalForm;
  parent: Fractal;
  fractals: Fractals | null = null;
  childrenForms = new FormRecord({});

  constructor({ dto, parent }: { dto?: FractalDto; parent?: Fractal | null }) {
    this.parent = parent ? parent : ({} as Fractal);
    this.dto = dto ? dto : new FractalDtoFactory(this.parent);
    this.form = createForm(this);
  }

  get sort(): string[] {
    return this.has(SplitIndicators.Sort) ? this.splitControlData(SplitIndicators.Sort) : this.childrenKeys;
  }

  get cursor(): string {
    return this.getControlData(Indicators.Cursor) || this.getControlData(Indicators.Position);
  }

  get children(): Fractal[] {
    return Object.values(this.fractals || {});
  }

  get isItem(): boolean {
    return !this.isRoot && this.parent.is(AppCollections);
  }

  get isRoot(): boolean {
    return this.is(AppEntities.Root);
  }

  get isCollection(): boolean {
    return this.is(AppCollections);
  }

  get controls(): ControlDto[] {
    return Object.values(this.dto.controls);
  }

  get childrenKeys(): string[] {
    return Object.keys(this.fractals || {});
  }

  get controlsKeys(): string[] {
    return Object.keys(this.dto.controls);
  }

  is(test: string | object): boolean {
    if (test instanceof FractalFactory) return this === test;
    if (typeof test === 'object') return Object.values(test).includes(this.cursor);
    return test === this.cursor;
  }

  has(test: string): boolean {
    return Boolean(this.getControlData(test));
  }

  getControlData(indicator: string): string {
    return this.dto.controls[indicator]?.data || '';
  }

  splitControlData(indicator: string): string[] {
    const data = this.getControlData(indicator);
    return data ? data.split(':') : [];
  }

  updateFractalByForm(): FractalDto {
    const [data, input] = Object.values(ControlFormsFields);
    for (const indicator in this.dto.controls) {
      const formRecord = this.form.get(indicator);
      if (formRecord) {
        const control = this.dto.controls[indicator];
        control.data = formRecord.value[data];
        control.input = formRecord.value[input];
      }
    }
    return this.dto;
  }

  getFractal(test: string): Fractal {
    const fractal = findFractalRecursively(test, this.fractals);
    return checkValue<Fractal>(fractal, test);
  }

  findFractal(test: string): Fractal | null {
    return findFractalRecursively(test, this.fractals);
  }

  getControl(indicator: string): ControlDto {
    const control = this.dto.controls[indicator];
    if (control) return control;
    else throw new Error(`Unable to get control by: ${indicator}`);
  }

  findControl(indicator: string): ControlDto | null {
    const control = this.dto.controls[indicator];
    return control ? control : null;
  }

  getControlFormsFields(name: string): ControlDtoFormsFields {
    const formRecord = this.form.controls[name];
    return Object.values(ControlFormsFields).reduce((acc, field) => {
      acc[field] = formRecord.controls[field];
      return acc;
    }, {} as ControlDtoFormsFields);
  }
}
