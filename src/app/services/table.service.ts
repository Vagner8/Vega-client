import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { TableDto, isResponseDto } from '@types';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private readonly _entitiesDto = new Map<string, TableDto[]>();

  set = (data: Data): void => {
    const responseDto = data['responseDto'];
    if (!responseDto) return;
    if (!isResponseDto<TableDto[]>(responseDto))
      throw new Error(`ResponseDto is ${responseDto}`);
    this._entitiesDto.set(responseDto.data[0].name, responseDto.data);
  };

  get(name: string | null): TableDto[] | undefined {
    if (!name) return [];
    return this._entitiesDto.get(name);
  }
}
