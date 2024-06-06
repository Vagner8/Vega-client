import { signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  ControlDto,
  ControlProps,
  ControlSignals,
  ControlStateValue,
  IControl,
} from '@types';
import { setSignals } from '@utils';

export class Control implements IControl {
  private _dto: ControlDto;
  private _state: ControlSignals;
  private _initialState: ControlStateValue;

  data: FormControl<string | null>;
  indicator: FormControl<string | null>;

  constructor({ dto, state }: ControlProps) {
    this._dto = dto;
    this._initialState = this.createInitialState(state);
    this._state = this.createState();
    this.data = new FormControl(dto.data);
    this.indicator = new FormControl(dto.indicator);
    this.onValuesChanges();
  }

  setState(value: Partial<ControlStateValue>): void {
    setSignals(value, this._state);
  }

  get dto(): ControlDto {
    return this._dto;
  }

  private onValuesChanges(): void {
    this.data.valueChanges.subscribe((v) => (this._dto.data = v || ''));
    this.indicator.valueChanges.subscribe(
      (v) => (this._dto.indicator = v || '')
    );
  }

  private createState(): ControlSignals {
    const { disabled } = this._initialState;
    return {
      disabled: signal(disabled),
    };
  }

  private createInitialState(
    state?: Partial<ControlStateValue>
  ): ControlStateValue {
    return {
      disabled: false,
      ...state,
    };
  }
}
