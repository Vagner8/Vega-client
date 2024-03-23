import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { EntityDto, isResponseDto } from '@types';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  private readonly _entitiesDto = new Map<string, EntityDto[]>();

  set = (data: Data): void => {
    const responseDto = data['responseDto'];
    if (!responseDto) return;
    if (!isResponseDto<EntityDto[]>(responseDto))
      throw new Error(`ResponseDto is ${responseDto}`);
    this._entitiesDto.set(responseDto.data[0].name, responseDto.data);
  };

  get(name: string | null): EntityDto[] | undefined {
    if (!name) return [];
    return this._entitiesDto.get(name);
  }
}
