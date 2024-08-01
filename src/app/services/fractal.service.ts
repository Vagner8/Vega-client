import { Injectable, signal } from '@angular/core';
import { FractalDto, TapsFractals } from '@types';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  active = signal<TapsFractals | null>(null);
  dto = signal<FractalDto | null>(null);
  // key = signal<TapsFractals | null>(null);
  // clickType = signal<ClickType | null>(null);

  // size(fractals: FractalsDto): number {
  //   return Object.keys(fractals).length;
  // }

  // copy({ parentId, controls, fractals }: FractalDto): FractalDto {
  //   return {
  //     parentId,
  //     controls: this.copyControls(controls),
  //     fractals: this.copyFractals(fractals),
  //   };
  // }

  // private copyFractals(fractals: FractalsDto): FractalsDto {
  //   const dto: FractalsDto = {};
  //   for (const key in fractals) {
  //     dto[key] = this.copy(fractals[key]);
  //   }
  //   return dto;
  // }

  // private copyControls(dto: ControlsDto): ControlsDto {
  //   const controls: ControlsDto = {};
  //   for (const key in dto) {
  //     controls[key] = this.copyControl(dto[key]);
  //   }
  //   return controls;
  // }

  // private copyControl({ parentId, indicator }: ControlDto): ControlDto {
  //   return {
  //     parentId,
  //     indicator,
  //     data: '',
  //   };
  // }
}
