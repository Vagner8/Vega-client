import { Injectable } from '@angular/core';
import { Unit, UnitDto } from '@types';
import { MapService } from '@services';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  dto!: UnitDto;
  unit!: Unit;

  constructor(private ms: MapService) {}

  set = (dto: UnitDto): void => {
    this.dto = dto;
    this.unit = this.ms.toUnit(dto);
  };
}
