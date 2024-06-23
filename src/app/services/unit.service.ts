import { Injectable } from '@angular/core';
import { Unit, UnitDto } from '@types';
import { MapService, TapService } from '@services';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  dto!: UnitDto;
  unit!: Unit;

  constructor(
    private ms: MapService,
    private ts: TapService,
  ) {}

  run = (dto: UnitDto): void => {
    this.dto = dto;
    this.unit = this.ms.toUnit(dto);
    this.ts.addPages(dto);
  };

  find(name: string): UnitDto {
    return this.dto.units[name];
  }
}
