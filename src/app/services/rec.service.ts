import { Injectable, signal } from '@angular/core';
import { BtnType, Rec, RecGroup, RecKey, RecType } from '@types';

@Injectable({
  providedIn: 'root',
})
export class RecService {
  public readonly recs: RecGroup = {
    btn: this._btns(),
  };

  write(key: RecKey, type: RecType, name: string): void {
    this.get(key, type).name.set(name);
  }

  get(key: RecKey, type: RecType): Rec {
    const rec = this.recs[key].find((rec) => rec.type === type);
    if (!rec) throw new Error(`No Rec with key: ${key} type: ${type}`);
    return rec;
  }

  private _btns(): Rec[] {
    return [
      this._btn('active'),
      this._btn('navigation'),
      this._btn('settings'),
      this._btn('toolbar'),
    ];
  }

  private _btn(type: BtnType): Rec {
    return { type, name: signal<string | null>(null) };
  }
}
